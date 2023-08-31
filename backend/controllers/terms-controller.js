const Terms = require("../models/terms");

const paginate = require("express-paginate");

const getAll = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Terms.find({})
        .sort({ createdAt: -1 })
        // .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Terms.count({}),
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

const createTerms = async (req, res) => {
  try {
    await Terms.deleteMany({});
    await Terms.create({
      termsText: req.body.termsText,
    });

    return res.status(200).json({
      message: "Terms Created success",
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
  createTerms,
};
