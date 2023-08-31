const paginate = require("express-paginate");
const Contact = require("../models/contact-form");
const emaliValidator = require("email-validator");
const { default: mongoose } = require("mongoose");

const addOne = async (req, res) => {
  try {
    // if (!emaliValidator.validate(req.body.email)) {
    //     return res.json({ error: "Invalid email" });
    //   }
    await Contact.deleteMany({});

    const newRecord = new Contact({
      ...req.body,
      createdBy: req.user._id,
    });
    await newRecord.save();

    return res.status(201).json({
      message: "Contact successfully created",
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
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Contact not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Contact successfully deleted",
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
      Contact.find({})
        .sort({ createdAt: -1 })
        // .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Contact.count({}),
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
  getAll,
};
