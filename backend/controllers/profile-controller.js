const User = require("../models/user");
const paginate = require("express-paginate");
const fs = require("fs");
const cloudinaryfunc = require("../cloudinary/cloudinary");
const cloudinary = require("cloudinary");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");

const updateOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    let secure_url = "default.png";
    let public_id = "default.png";

    let { password } = req.body;

    if (password != undefined) {
      if (password.length == 0) {
        return res.status(404).json({
          message: "Password cannot be empty",
          success: false,
        });
      }
    }

    if (req.files[0]) {
      let result = await cloudinary.uploader.upload(req.files[0].path);
      secure_url = result.secure_url;
      public_id = result.public_id;
      const imageValue = await User.findById(req.params.id);
      await cloudinaryfunc.deletefromCloud(imageValue.imageId);
      fs.readdirSync("public").forEach((file) => {
        fs.unlinkSync(`public/${file}`);
      });
    } else {
      let result = await User.findById(req.params.id).select({
        image: 1,
        _id: 0,
      });
      secure_url = result.image;
      public_id = result.imageId;
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 16);
      password = hashedPassword;
    } else {
      let result = await User.findById(req.params.id).select({
        password: 1,
        _id: 0,
      });
      password = result.password;
    }

    let profile = req.body;
    profile.image = secure_url;
    profile.imageId = public_id;
    profile.password = password;
    profile.createdBy = req.user._id;

    await User.findByIdAndUpdate(req.params.id, profile);
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

const removeOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const imageValue = await User.findById(req.params.id);
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    await cloudinaryfunc.deletefromCloud(imageValue.imageId);
    return res.status(201).json({
      message: "User Removed successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getOne = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.user._id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const item = await User.findById(req.user._id).select("-password");
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
  updateOne,
  getOne,
  removeOne,
};
