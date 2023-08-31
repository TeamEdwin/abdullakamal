const Gallery = require("../models/gallery");
const paginate = require("express-paginate");
const Comment = require("../models/comment");
const fs = require("fs");
const cloudinary = require("../cloudinary/cloudinary");
const { default: mongoose } = require("mongoose");

const addOne = async (req, res) => {
  if (req.files == undefined) {
    return res.status(500).json({
      message: "No Images Uploaded",
      success: false,
    });
  }
  try {
    const uploader = async (path) => await cloudinary.uploads(path);
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;

      const newPath = await uploader(path);

      const newRecord = new Gallery({
        imagetitle: req.body.imagetitle,
        imageDescription: "Gallery Image",
        imageUrl: newPath.url,
        imageId: newPath.id,

        createdBy: req.user._id,
      });
      await newRecord.save();
      fs.unlinkSync(path);

      urls.push(newPath);
    }

    res.status(200).json({
      message: "images uploaded successfully",
      data: urls,
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
    let item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Image not found",
        success: false,
      });
    }

    await cloudinary.deletefromCloud(item.imageId);
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Image not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Image Removed successfully",
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
      Gallery.find({})
        .sort({ createdAt: -1 })
        .skip(req.skip)
        .lean()
        .exec(),
      Gallery.count({}),
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
  getAll,
  removeOne,
};
