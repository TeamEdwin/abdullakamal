const Department = require("../models/departments");
const cloudinary = require("cloudinary");
const paginate = require("express-paginate");
const fs = require("fs");
const Doctor = require("../models/doctor");
const { default: mongoose } = require("mongoose");
const cloudinaryfunc = require("../cloudinary/cloudinary");
const slugify = require("slugify");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const addOne = async (req, res) => {
  if (!req.files.coverImage || req.files.coverImage == undefined) {
    return res.status(404).json({
      message: "Please Upload Cover Image",
      success: false,
    });
  }
  if (!req.files.svgImage || req.files.svgImage == undefined) {
    return res.status(404).json({
      message: "Please Upload Svg Image",
      success: false,
    });
  }

  const imageLocation = req.files.coverImage[0].path;
  const svgLocation = req.files.svgImage[0].path;

  try {
    const result = await cloudinary.uploader.upload(imageLocation);
    const resultSvg = await cloudinary.uploader.upload(svgLocation);

    const newRecord = new Department({
      "en-US": {
        departmentName: req.body["en-US.departmentName"],
        description: req.body["en-US.description"],
      },
      "ar-BH": {
        departmentName: req.body["ar-BH.departmentName"],
        description: req.body["ar-BH.description"],
      },
      slug: slugify(req.body.slug.replace(/&/g, " "), {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g,
      }),
      coverImage: result.secure_url,
      coverImageId: result.public_id,
      svgImage: resultSvg.secure_url,
      svgImageId: resultSvg.public_id,
      department: req.body.department,
      country: req.body.country,
      city: req.body.city,
      gender: req.body.gender,

      createdBy: req.user._id,
    });
    await newRecord.save();

    fs.unlinkSync(imageLocation);
    fs.unlinkSync(svgLocation);
    return res.status(201).json({
      message: "Item successfully created",
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
      Department.find({})
        .sort({ createdAt: "ascending" })
        .skip(req.skip)
        .lean()
        .exec(),
      Department.count({}),
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

const removeOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    let doctors = await Doctor.find({
      departmentID: req.params.id,
    });
    const department = await Department.findById(req.params.id);
    if (doctors.length > 0) {
      return res.status(400).json({
        message: "Department has doctors",
        success: false,
      });
    } else {
      const deleted = await Department.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          message: "Department not found",
          success: false,
        });
      }
      await cloudinaryfunc.deletefromCloud(department.coverImageId);
      await cloudinaryfunc.deletefromCloud(department.svgImageId);
      return res.status(201).json({
        message: "Department deleted successfully",
        success: true,
      });
    }
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

  const notfound = await Department.findById(req.params.id);
  if (!notfound) {
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  }

  try {
    let result = "";
    let resultSvg = "";
    let public_id_cover = "";
    let public_id_svg = "";
    let slug_val = "";
    if (req.files.coverImage && req.files.coverImage != undefined) {
      const [{ path: imageLocation }] = req.files.coverImage;
      let cover_url = await cloudinary.uploader.upload(imageLocation);
      const department = await Department.findById(req.params.id);
      await cloudinaryfunc.deletefromCloud(department.coverImageId);
      result = cover_url.secure_url;
      public_id_cover = cover_url.public_id;
    } else {
      let images = await Department.find({ _id: req.params.id })
        .select({
          coverImage: 1,
          svgImage: 1,
          coverImageId: 1,
          svgImageId: 1,
          _id: 0,
        })
        .exec()
        .then((data) => {
          return data;
        });
      result = images[0].coverImage;

      public_id_cover = images[0].coverImageId;
    }

    if (req.files.svgImage && req.files.svgImage != undefined) {
      const [{ path: svgLocation }] = req.files.svgImage;
      let svg_url = await cloudinary.uploader.upload(svgLocation);
      const department = await Department.findById(req.params.id);
      await cloudinaryfunc.deletefromCloud(department.svgImageId);
      resultSvg = svg_url.secure_url;
      public_id_svg = svg_url.public_id;
    } else {
      let images = await Department.find({ _id: req.params.id })
        .select({
          coverImage: 1,
          svgImage: 1,
          coverImageId: 1,
          svgImageId: 1,
          _id: 0,
        })
        .exec()
        .then((data) => {
          return data;
        });
      resultSvg = images[0].svgImage;
      public_id_svg = images[0].svgImageId;
    }
    if (req.body.slug) {
      slug_val = slugify(req.body.slug.replace(/&/g, " "), {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g,
      });
    } else {
      let slugdb_val = await Department.find({ _id: req.params.id })
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

    let department = req.body;
    department.coverImage = result;
    department.coverImageId = public_id_cover;
    department.svgImage = resultSvg;
    department.slug = slug_val;
    department.svgImageId = public_id_svg;
    department.createdBy = req.user._id;

    const notfound = await Department.findByIdAndUpdate(
      req.params.id,
      department
    );
    if (!notfound) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }

    fs.readdirSync("public").forEach((file) => {
      fs.unlinkSync(`public/${file}`);
    });
    return res.status(201).json({
      message: "Department successfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getOne = async (req, res) => {
  const notfound = await Department.findOne({ slug: req.params.slug });
  if (!notfound) {
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  }

  try {
    const [results, itemCount] = await Promise.all([
      Department.findOne({ slug: req.params.slug })

        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Department.count({}),
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

const getOneById = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  const notfound = await Department.findById(req.params.id);
  if (!notfound) {
    return res.status(500).json({
      message: "Item not found",
      success: false,
    });
  }
  try {
    const [results, itemCount] = await Promise.all([
      Department.findById(req.params.id).skip(req.skip).lean().exec(),
      Department.count({}),
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

module.exports = {
  addOne,
  removeOne,
  updateOne,
  getAll,
  getOne,
  getOneById,
};
