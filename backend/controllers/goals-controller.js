const paginate = require("express-paginate");
const modelSchema = require("../models");
const mongoose = require("mongoose");
const Goals = require("../models/goal");

const addOne = async (req, res) => {
  try {
    const newRecord = await Goals({
      "en-US": {
        goalTitle: req.body["en-US"].goalTitle,
        goalDescription: req.body["en-US"].goalDescription,
      },
      "ar-BH": {
        goalTitle: req.body["ar-BH"].goalTitle,
        goalDescription: req.body["ar-BH"].goalDescription,
      },
      createdBy: req.user._id,
    });
    await newRecord.save();

    return res.status(201).json({
      message: "Goals successfully created",
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
    const deleted = await Goals.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Goals not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Goals successfully deleted",
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
    const notfound = await Goals.findByIdAndUpdate(req.params.id, {
      "en-US": {
        goalTitle: req.body["en-US.goalTitle"],
        goalDescription: req.body["en-US.goalDescription"],
      },
      "ar-BH": {
        goalTitle: req.body["ar-BH.goalTitle"],
        goalDescription: req.body["ar-BH.goalDescription"],
      },

      createdBy: req.user._id,
    });
    if (!notfound) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Item successfully updated",
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
      Goals.find({})
        .sort({ createdAt: -1 })
        // .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Goals.count({}),
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
    const item = await Goals.findById(req.params.id);
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
