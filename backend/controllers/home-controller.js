const Home = require("../models/home");
const paginate = require("express-paginate");
const upload = require("../multer/multer");
const fs = require("fs");

const addOne = async (req, res) => {
  try {
    const newRecord = new Home({
      name: req.body.name,
      subject: req.body.subject,
      testimonial: req.body.subject,

      createdBy: req.user._id,
    });
    await newRecord.save();

    res.status(200).json({
      message: "Home section updated successfully",
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
        // .limit(req.query.limit)
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
};
