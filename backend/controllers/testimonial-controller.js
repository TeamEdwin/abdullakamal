const Testimonial = require("../models/testimonial");
const HealthFitness = require("../models/healthfitness");
const paginate = require("express-paginate");
const upload = require("../multer/multer");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

const addOne = async (req, res) => {
  try {
    const newRecord = new Testimonial({
      name: req.body.name,
      subject: req.body.subject,
      testimonial: req.body.testimonial,
      createdBy: req.user._id,
    });
    await newRecord.save();

    res.status(200).json({
      message: "Testimonial section updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const addPoints = async (req, res) => {
  try {
    const newRecord = new HealthFitness({
      "en-US": {
        points: req.body["en-US"].points,
      },
      "ar-BH": {
        points: req.body["ar-BH"].points,
      },
      createdBy: req.user._id,
    });
    await newRecord.save();

    res.status(200).json({
      message: "Health Points section updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const removeTestimonial = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Testimonial not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Testimonial Removed successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const removeHealth = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const deleted = await HealthFitness.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "HealthFitness not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "HealthFitness Removed successfully",
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
    const [resultsTestimonial] = await Promise.all([
      Testimonial.find({})
        .sort({ createdAt: "asc" })
        .skip(req.skip)
        .lean()
        .exec(),
      Testimonial.count({}),
    ]);

    const [healthPoints] = await Promise.all([
      HealthFitness.find({})
        .sort({ createdAt: "asc" })
        .skip(req.skip)
        .lean()
        .exec(),
      HealthFitness.count({}),
    ]);

    return res.status(201).json({
      object: "list",

      testimonial: resultsTestimonial,
      fitnessPoints: healthPoints,

      currentPage: req.query.page,
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
  addPoints,
  removeTestimonial,
  removeHealth,
};
