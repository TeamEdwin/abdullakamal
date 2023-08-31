const Privacy = require("../models/privacy");

const paginate = require("express-paginate");

const getAll = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Privacy.find({})
        .sort({ createdAt: -1 })
        // .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Privacy.count({}),
    ]);

    const pageCount = Math.ceil(itemCount / req.query.limit);
    return res.status(201).json({
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

const createPrivacy = async (req, res) => {
  try {
    await Privacy.deleteMany({});
    await Privacy.create({
      privacyText: req.body.privacyText,
    });

    return res.status(200).json({
      message: "Privacy Created success",
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
  createPrivacy,
};
