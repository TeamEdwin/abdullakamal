const Health = require("../models/health");
const cloudinary = require("cloudinary");
const paginate = require("express-paginate");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const addOne = async (req, res) => {
  if (!req.files.svgImage || req.files.svgImage == undefined) {
    return res.status(404).json({
      message: "Please Upload Svg Image",
      success: false,
    });
  }

  const svgLocation = req.files.svgImage[0].path;

  try {
    const resultSvg = await cloudinary.uploader.upload(svgLocation);

    const newRecord = new Health({
      healthTitle: req.body.healthTitle,

      description: req.body.description,

      svgImage: resultSvg.secure_url,

      createdBy: req.user._id,
    });
    await newRecord.save();

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
      Health.find({})
        .sort({ createdAt: "ascending" })
        .skip(req.skip)
        .lean()
        .exec(),
      Health.count({}),
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
    const deleted = await Health.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Health not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Health Removed successfully",
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
  getAll,
};
