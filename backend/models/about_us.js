const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AboutUsSchema = new Schema(
  {
    "en-US": {
      aboutUs: {
        type: String,
        required: true,
      },
      messageFromFounder: {
        type: String,
      },
      featurePoints: {
        type: String,
      },
      quote: {
        type: String,
      },
      messageFromAKMC: {
        type: String,
      },
      vision: {
        type: String,
      },
      mission: {
        type: String,
      },
      values: {
        type: String,
      },
    },
    "ar-BH": {
      aboutUs: {
        type: String,
        required: true,
      },
      messageFromFounder: {
        type: String,
      },
      featurePoints: {
        type: String,
      },
      quote: {
        type: String,
      },
      messageFromAKMC: {
        type: String,
      },
      vision: {
        type: String,
      },

      mission: {
        type: String,
      },
      values: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutUs", AboutUsSchema);
