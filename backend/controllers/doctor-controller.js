const cloudinary = require("cloudinary");
const Doctor = require("../models/doctor");
const paginate = require("express-paginate");
const Department = require("../models/departments");
const mongoose = require("mongoose");
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

const addOne = async (req, res) => {
  try {
    let public_id = "default.png";
    let secure_url = "default.png";

    if (req.files[0]) {
      let result = await cloudinary.uploader.upload(req.files[0].path);

      secure_url = result.secure_url;
      (public_id = result.public_id),
        fs.readdirSync("public").forEach((file) => {
          fs.unlinkSync(`public/${file}`);
        });
    }

    const removeComma = req.body.departmentID.split(",");

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

    await Doctor.create({
      "en-US": {
        firstname: req.body["en-US.firstname"],
        lastname: req.body["en-US.lastname"],
        designation: req.body["en-US.designation"],
        qualification: req.body["en-US.qualification"],
      },
      "ar-BH": {
        firstname: req.body["ar-BH.firstname"],
        lastname: req.body["ar-BH.lastname"],
        designation: req.body["ar-BH.designation"],
        qualification: req.body["ar-BH.qualification"],
      },
      slug: slugify(
        req.body["en-US.firstname"] +
          req.body["en-US.lastname"].replace(/&/g, " "),
        {
          replacement: "-",
          lower: true,
          strict: true,
          trim: true,
          remove: /[*+~.()'"!:@]/g,
        }
      ),
      email: req.body.email,
      imageUrl: secure_url,
      imageId: public_id,
      phonenumber: req.body.phonenumber,
      gender: req.body.gender,
      departmentID: objectIdArray,
      city: req.body.city,
      country: req.body.country,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "Doctors Added Successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const removeOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const imageValue = await Doctor.findById(req.params.id);
    const deleted = await Doctor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Doctor not found",
        success: false,
      });
    }
    await cloudinaryfunc.deletefromCloud(imageValue.imageId);
    return res.status(201).json({
      message: "Doctor Removed successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const updateOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  const notfound = await Doctor.findById(req.params.id);
  if (!notfound) {
    return res.status(404).json({
      message: "Doctor not found",
      success: false,
    });
  }

  try {
    let secure_url = "default.png";
    let public_id = "default.png";
    if (req.files[0]) {
      let result = await cloudinary.uploader.upload(req.files[0].path);
      const imageValue = await Doctor.findById(req.params.id);

      await cloudinaryfunc.deletefromCloud(imageValue.imageId);
      public_id = result.public_id;

      secure_url = result.secure_url;
      fs.readdirSync("public").forEach((file) => {
        fs.unlinkSync(`public/${file}`);
      });
    } else {
      let result = await Doctor.findById(req.params.id).select({
        imageUrl: 1,
        _id: 0,
      });
      secure_url = result.imageUrl;
      public_id = result.imageId;
    }

    let doctor = req.body;

    doctor.imageUrl = secure_url;
    doctor.imageId = public_id;
    doctor.createdBy = req.user._id;

    let removeSqaureBrackets = [];
    let objectIdArray = [];
    if (req.body.departmentID) {
      const removeComma = req.body.departmentID.split(",");

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
      let images = await Doctor.find({ _id: req.params.id })
        .select({
          departmentID: 1,
        })
        .then((data) => {
          return data;
        });

      objectIdArray = images[0].departmentID;
    }

    doctor.departmentID = objectIdArray;

    const notfound = await Doctor.findByIdAndUpdate(req.params.id, {
      "en-US": {
        firstname: req.body["en-US.firstname"],
        lastname: req.body["en-US.lastname"],
        designation: req.body["en-US.designation"],
        qualification: req.body["en-US.qualification"],
      },
      "ar-BH": {
        firstname: req.body["ar-BH.firstname"],
        lastname: req.body["ar-BH.lastname"],
        designation: req.body["ar-BH.designation"],
        qualification: req.body["ar-BH.qualification"],
      },
      slug: slugify(
        req.body["en-US.firstname"] +
          req.body["en-US.lastname"].replace(/&/g, " "),
        {
          replacement: "-",
          lower: true,
          strict: true,
          trim: true,
          remove: /[*+~.()'"!:@]/g,
        }
      ),
      email: req.body.email,
      imageUrl: doctor.imageUrl,
      imageId: doctor.imageId,
      phonenumber: req.body.phonenumber,
      gender: req.body.gender,
      departmentID: objectIdArray,
      city: req.body.city,
      country: req.body.country,
      createdBy: req.user._id,
    });
    if (!notfound) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Doctor successfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Doctor.find({})
        .sort({ createdAt: "ascending" })
        .select({ __v: 0, createdAt: 0, updatedAt: 0 })
        .populate("departmentID")
        .skip(req.skip)
        .lean()
        .exec(),
      Doctor.count({}),
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

const getOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  const notfound = await Doctor.findById(req.params.id);
  if (!notfound) {
    return res.status(404).json({
      message: "Doctor not found",
      success: false,
    });
  }
  try {
    let item = await Doctor.findById(req.params.id)
      .populate("departmentID")
      .select({ __v: 0, createdAt: 0, updatedAt: 0 });

    return res.status(201).json({ data: item });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getDocterByDepId = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    let item = await Doctor.find({ departmentID: req.params.id });
    return res.status(201).json({ data: item });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getDocterByDepSlug = async (req, res) => {
  try {
    let item = await Department.find({ slug: req.params.slug });

    return res.status(201).json({ data: item });
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
  getDocterByDepId,
  getDocterByDepSlug,
};
