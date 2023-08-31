const paginate = require("express-paginate");
const emaliValidator = require("email-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const modelSchema = require("../models");
const AboutUs = require("../models/about_us");
const PatientRights = require("../models/patient_rights");
const Goals = require("../models/goal");

const getAll = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      AboutUs.find({})
        .sort({ createdAt: -1 })
        // .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      AboutUs.count({}),
    ]);

    const [goalResults, goalItemCount] = await Promise.all([
      Goals.find({})
        .sort({ createdAt: "asc" })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Goals.count({}),
    ]);

    const [patientRightsResults, patientRightsItemCount] = await Promise.all([
      PatientRights.find({})
        .sort({ createdAt: "asc" })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      PatientRights.count({}),
    ]);

    const pageCount = Math.ceil(itemCount / req.query.limit);
    return res.status(201).json({
      has_more: paginate.hasNextPages(req)(pageCount),
      data: results,
      goals: goalResults,
      patientRights: patientRightsResults,
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

const createAboutUs = async (req, res) => {
  try {
    await AboutUs.deleteMany({});
    await AboutUs.create({
      "en-US": {
        aboutUs: req.body["en-US"].aboutUs,
        messageFromFounder: req.body["en-US"].messageFromFounder,
        featurePoints: req.body["en-US"].featurePoints,
        quote: req.body["en-US"].quote,
        messageFromAKMC: req.body["en-US"].messageFromAKMC,
        vision: req.body["en-US"].vision,
        mission: req.body["en-US"].mission,
        vision: req.body["en-US"].vision,
        values: req.body["en-US"].values,
      },
      "ar-BH": {
        aboutUs: req.body["ar-BH"].aboutUs,
        messageFromFounder: req.body["ar-BH"].messageFromFounder,
        featurePoints: req.body["ar-BH"].featurePoints,
        quote: req.body["ar-BH"].quote,
        messageFromAKMC: req.body["ar-BH"].messageFromAKMC,
        vision: req.body["ar-BH"].vision,
        mission: req.body["ar-BH"].mission,
        vision: req.body["ar-BH"].vision,
        values: req.body["ar-BH"].values,
      },
    });

    return res.status(200).json({
      message: "About Us Created success",
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
  getAll,
  createAboutUs,
};
