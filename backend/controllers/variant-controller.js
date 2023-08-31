const Package = require("../models/package");
const paginate = require("express-paginate");
const mongoose = require("mongoose");
const Variant = require("../models/variant");

const addOne = async (req, res) => {
  try {
    const newRecord = Variant({
      "en-US": {
        title: req.body["en-US.title"],
        description: req.body["en-US.description"],
      },
      "ar-BH": {
        title: req.body["ar-BH.title"],
        description: req.body["ar-BH.description"],
      },
      price: req.body.price,
      currency: req.body.currency,
      packageID: req.body.packageID,
      createdBy: req.user._id,
    });

    await newRecord.save();
    return res.status(201).json({
      message: "Variant successfully created",
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
      Variant.find({})
        .sort({ createdAt: "ascending" })
        .skip(req.skip)
        .lean()
        .exec(),
      Variant.count({}),
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
    const deleted = await Variant.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Variant not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Variant Removed successfully",
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
    const notfound = await Variant.findByIdAndUpdate(req.params.id, {
      "en-US": {
        title: req.body.title,
        description: req.body.description,
      },
      "ar-BH": {
        title: req.body.title,
        description: req.body.description,
      },
      price: req.body.price,
      currency: req.body.currency,

      packageID: req.body.packageID,

      createdBy: req.user._id,
    });
    if (!notfound) {
      return res.status(404).json({
        message: "Variant not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Variant successfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getVariantsByPackageId = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    let item = await Variant.find({
      packageID: mongoose.Types.ObjectId(req.params.id),
    });
    let package = await Package.find({
      packageID: mongoose.Types.ObjectId(req.params.id),
    });

    return res.status(201).json({ packages: package, variant: item });
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
  
  const notfound = await Variant.findById(req.params.id);
  if (!notfound) {
    return res.status(404).json({
      message: "Variant not found",
      success: false,
    });
  }

  try {
    const [results, itemCount] = await Promise.all([
      Variant.findById(req.params.id)

        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Variant.count({}),
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
  getVariantsByPackageId,

  removeOne,
  updateOne,
  getAll,
  getOne,
};
