const Story = require("../models/story");
const paginate = require("express-paginate");
const cloudinary = require("cloudinary");
const Comment = require("../models/comment");
const cloudinaryfunc = require("../cloudinary/cloudinary");
const fs = require("fs");
const { default: slugify } = require("slugify");
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const addOne = async (req, res) => {
  if (!req.body.imageUrl || req.body.imageUrl == undefined) {
    return res.status(404).json({
      message: "Please Upload Blog  Cover Image",
      success: false,
    });
  }
  try {
    const imageLocation = req.files[0].path;
    const result = await cloudinary.uploader.upload(imageLocation);

    if (req.files[0]) {
      fs.readdirSync("public").forEach((file) => {
        fs.unlinkSync(`public/${file}`);
      });
    }
    fs.readdirSync("public").forEach((file) => {
      fs.unlinkSync(`public/${file}`);
    });

    const newRecord = new Story({
      "en-US": {
        title: req.body["en-US.title"],
        body: req.body["en-US.body"],
      },
      "ar-BH": {
        title: req.body["ar-BH.title"],
        body: req.body["ar-BH.body"],
      },
      category: req.body.category,
      imageUrl: result.secure_url,
      imageId: result.public_id,
      slug: slugify(req.body["en-US.title"].replace(/&/g, " "), {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g,
      }),
      viewsCount: req.body.viewsCount,
      comments: req.body.comments,
      createdBy: req.user._id,
    });
    await newRecord.save();
    return res.status(201).json({
      message: "Item successfully created",
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
  try {
    const imageValue = await Story.findById(req.params.id);
    const deleted = await Story.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    await cloudinaryfunc.deletefromCloud(imageValue.imageId);
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
  try {
    let story = req.body;
    let secure_url = "default.png";
    let public_id = "default.png";
    if (req.files[0]) {
      let result = await cloudinary.uploader.upload(req.files[0].path);
      const imageValue = await Story.findById(req.params.id);
      await cloudinaryfunc.deletefromCloud(imageValue.imageId);
      public_id = result.public_id;

      secure_url = result.secure_url;
      fs.readdirSync("public").forEach((file) => {
        fs.unlinkSync(`public/${file}`);
      });
    } else {
      let result = await Story.findById(req.params.id).select({
        imageUrl: 1,
        _id: 0,
      });
      secure_url = result.imageUrl;
      public_id = result.imageId;
    }

    story.imageUrl = secure_url;
    story.imageId = public_id;
    story.createdBy = req.user._id;

    // story.slug = generateSlug(story["en-US.title"].title);
    await Story.findByIdAndUpdate(req.params.id, {
      "en-US": {
        title: req.body["en-US.title"],
        body: req.body["en-US.body"],
      },
      "ar-BH": {
        title: req.body["ar-BH.title"],
        body: req.body["ar-BH.body"],
      },
      category: req.body.category,
      imageUrl: story.imageUrl,
      imageId: story.imageId,
      slug: slugify(req.body["en-US.title"].replace(/&/g, " "), {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g,
      }),
      viewsCount: req.body.viewsCount,
      comments: req.body.comments,
      createdBy: req.user._id,
    });
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
      Story.find({})
        .populate("createdBy", "name email image")
        .populate("category")
        .sort({ createdAt: -1 })
        // .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Story.count({}),
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
    let item = await Story.findByIdAndUpdate(req.params.id, {
      $inc: { viewsCount: 1 },
    }).populate("category", "title");
    if (item) {
      item.comments = await Comment.find({ story: item._id });
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

const getTopStories = async (req, res) => {
  try {
    let result = await Story.find({})
      .populate("category", "title")
      .sort({ viewsCount: -1 })
      .limit(3)
      .lean()
      .exec();

    return res.status(201).json({
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getOneBySlug = async (req, res) => {
  try {
    let item = await Story.findOneAndUpdate(
      { slug: req.params.slug },
      {
        $inc: { viewsCount: 1 },
      }
    ).populate("category", "title");
    if (item) {
      item.comments = await Comment.find({ story: item._id });
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
  getTopStories,
  getOneBySlug,
};
