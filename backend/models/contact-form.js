const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    "en-US": {
      description: {
        type: String,
        //   required: true,
      },
      address: {
        type: String,
        //   required: true,
      },
    },
    "ar-BH": {
      description: {
        type: String,
        //   required: true,
      },
      address: {
        type: String,
        //   required: true,
      },
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
      //   required: true,
    },
    secondaryPhoneNumber: {
      type: String,
      //   required: true,
    },
    thirdPhoneNumber: {
      type: String,
      //   required: true,
    },
    fourthPhoneNumber: {
      type: String,
    },
    fifthPhoneNumber: {
      type: String,
    },
    sixthPhoneNumber: {
      type: String,
    },
    faceBook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    otherInstagram01: {
      type: String,
    },
    otherInstagram02: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactPage", ContactSchema);
