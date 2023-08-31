const {  model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PrivacySchema = new Schema(
  {
    privacyText : {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

PrivacySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Privacy", PrivacySchema);
