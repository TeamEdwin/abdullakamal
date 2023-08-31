const Category = require("../models/category");

const paginate = require("express-paginate");
const slugify = require("slugify");
const { default: mongoose } = require("mongoose");

const addOne = async (req, res) => {
  try {
    const newRecord = new Category({
      "en-US": {
        title: req.body["en-US"].title,
        description: req.body["en-US"].description,
      },
      "ar-BH": {
        title: req.body["ar-BH"].title,
        description: req.body["ar-BH"].description,
      },
      slug: slugify(req.body["en-US"].title.replace(/&/g, " "), {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g,
      }),
      createdBy: req.user._id,
    });
    await newRecord.save();

    return res.status(201).json({
      message: "Category successfully created",
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
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Item successfully deleted",
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

  try {
    const notfound = await Category.findByIdAndUpdate(req.params.id, {
      "en-US": {
        title: req.body["en-US"].title,
        description: req.body["en-US"].description,
      },
      "ar-BH": {
        title: req.body["ar-BH"].title,
        description: req.body["ar-BH"].description,
      },
      slug: slugify(req.body["en-US"].title.replace(/&/g, " "), {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g,
      }),
      createdBy: req.user._id,
    });
    if (!notfound) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Category successfully updated",
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
      Category.find({})
        .sort({ createdAt: -1 })
        // .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Category.count({}),
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
  
  try {
    const item = await Category.findById(req.params.id);
    if (item) {
      return res.status(200).json(item);
    }
    return res.status(404).json({
      message: "Item not found",
      success: false,
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
};
