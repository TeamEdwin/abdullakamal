const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const paginate = require("express-paginate");
const modelSchema = require("../models");
const Package = require("../models/package");
const Variant = require("../models/variant");
const PackagePurchased = require("../models/package_purchased");
const fs = require("fs");
const cloudinaryfunc = require("../cloudinary/cloudinary");

const slugify = require("slugify");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
function toObjectId(ids) {
  if (ids.constructor === Array) {
    return ids.map(mongoose.Types.ObjectId);
  }
  return mongoose.Types.ObjectId(ids);
}

// CREATE Package
const addOne = async (req, res) => {
  const users = [];
  const imageFileData = req.files[0];
  try {
    if (!req.body.associatedDoctors) {
      return res.status(500).json({
        message: "Associated Doctors Required",
        success: false,
      });
    }

    const removeComma = req.body.associatedDoctors.split(",");
    const removeSqaureBrackets = [];
    for (let i = 0; i < removeComma.length; i++) {
      const removeDoubleQuotes = removeComma[i].replace(
        /[&\/\\#,+()$~%.'":*?<>{}]/g,
        ""
      );
      await removeSqaureBrackets.push(
        removeDoubleQuotes.replace(/[\[\]\']+/g, "")
      );
    }
    let objectIdArray = toObjectId(removeSqaureBrackets);
    let public_id = "default.png";
    let secure_url = "default.png";
    if (!imageFileData) {
      return res.status(500).json({
        message: "Please Upload Package Image",
        success: false,
      });
    }
    if (imageFileData) {
      let result = await cloudinary.uploader.upload(imageFileData.path);

      secure_url = result.secure_url;
      (public_id = result.public_id),
        fs.readdirSync("public").forEach((file) => {
          fs.unlinkSync(`public/${file}`);
        });
    }

    const newRecord = await Package({
      "en-US": {
        title: req.body["en-US.title"],
        description: req.body["en-US.description"],
      },
      "ar-BH": {
        title: req.body["ar-BH.title"],
        description: req.body["ar-BH.description"],
      },
      slug: slugify(req.body.slug.replace(/&/g, " "), {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g,
      }),
      packageImage: secure_url,
      packageImageId: public_id,
      departmentID: req.body.departmentID,
      associatedDoctors: objectIdArray,
      createdBy: req.user._id,
    });
    await newRecord.save();
    return res.status(201).json({
      message: "Package Added successfully created",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// DELETE Package
const removeOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const imageValue = await Package.findById(req.params.id);
    const deleted = await Package.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Package not found",
        success: false,
      });
    }
    await cloudinaryfunc.deletefromCloud(imageValue.imageId);
    return res.status(201).json({
      message: "Package Removed successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// UPDATE Package
const updateOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  const imageFileData = req.files[0];

  const notfound = await Package.findById(req.params.id);
  if (!notfound) {
    return res.status(404).json({
      message: "Package not found",
      success: false,
    });
  }

  try {
    let secure_url = "default.png";
    let public_id = "default.png";
    let objectIdArray = [];
    let slug_val = "";

    if (imageFileData) {
      let result = await cloudinary.uploader.upload(imageFileData.path);
      const imageValue = await Package.findById(req.params.id);
      await cloudinaryfunc.deletefromCloud(imageValue.packageImageId);
      public_id = result.public_id;

      secure_url = result.secure_url;
      fs.readdirSync("public").forEach((file) => {
        fs.unlinkSync(`public/${file}`);
      });
    } else {
      let result = await Package.findById(req.params.id).select({
        packageImage: 1,
        _id: 0,
      });

      secure_url = result.packageImage;
      public_id = result.packageImageId;
    }

    if (req.body.associatedDoctors) {
      const removeComma = req.body.associatedDoctors.split(",");
      const removeSqaureBrackets = [];

      for (let i = 0; i < removeComma.length; i++) {
        const removeDoubleQuotes = removeComma[i].replace(
          /[&\/\\#,+()$~%.'":*?<>{}]/g,
          ""
        );
        await removeSqaureBrackets.push(
          removeDoubleQuotes.replace(/[\[\]\']+/g, "")
        );
      }

      objectIdArray = toObjectId(removeSqaureBrackets);
    } else {
      let result = await Package.findById(req.params.id).select({
        associatedDoctors: 1,
        _id: 0,
      });

      objectIdArray = result[0];
    }
    let package = req.body;
    if (req.body.slug) {
      slug_val = slugify(req.body.slug.replace(/&/g, " "), {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g,
      });
    } else {
      let slugdb_val = await Package.find({ _id: req.params.id })
        .select({
          slug_val: 1,

          _id: 0,
        })
        .exec()
        .then((data) => {
          return data;
        });

      slug_val = slugdb_val[0].slug;
    }
    package.slug = slug_val;

    package.packageImage = secure_url;
    package.packageImageId = public_id;
    package.createdBy = req.user._id;
    package.associatedDoctors = objectIdArray;

    const notfound = await Package.findByIdAndUpdate(req.params.id, {
      "en-US": {
        title: req.body["en-US.title"],
        description: req.body["en-US.description"],
      },
      "ar-BH": {
        title: req.body["ar-BH.title"],
        description: req.body["ar-BH.description"],
      },
      slug: package.slug,
      packageImage: package.packageImage,
      packageImageId: package.packageImageId,
      departmentID: req.body.departmentID,
      associatedDoctors: package.associatedDoctors,
      createdBy: req.user._id,
    });
    if (!notfound) {
      return res.status(404).json({
        message: "Package not found",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Package successfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// READ Package - ALL
const getAll = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Package.find({})
        .populate("departmentID", "departmentName slug")
        .populate("associatedDoctors", "firstname")
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Package.count({}),
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);

    return res.status(201).json({
      object: "list",
      has_more: paginate.hasNextPages(req)(pageCount),
      data: results,
      pageCount,
      itemCount,
      currentPage: req.query.page,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// READ Package - By Id
const getOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  const notfound = await Package.findById(req.params.id);
  if (!notfound) {
    return res.status(404).json({
      message: "Package not found",
      success: false,
    });
  }

  try {
    let item = await Package.findById(req.params.id)
      .populate("departmentID", "departmentName slug")
      .populate("associatedDoctors", "en-US.firstname en-US.lastname")
      .sort({ createdAt: -1 })
      .limit(req.query.limit)
      .skip(req.skip)
      .lean()
      .exec();

    item.variants = await Variant.find({
      packageID: mongoose.Types.ObjectId(req.params.id),
    });

    return res.status(201).json({ data: item });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const purchagedPackage = async (req, res) => {
  try {
    const newRecord = await PackagePurchased({
      order_id: req.body.order_id,
      package_id: req.body.package_id,
      variant_id: req.body.variant_id,
      doctor_id: req.body.doctor_id,
      customer_name: req.body.customer_name,
      customer_email: req.body.customer_email,
      customer_phone: req.body.customer_phone,
      amount: req.body.amount,
    });

    await newRecord.save();
    return res.status(201).json({
      message: "Package Purchased successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  addOne,
  removeOne,
  updateOne,
  getAll,
  getOne,
  purchagedPackage,
};
