const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    "en-US": {
      goalTitle: {
        type: String,
        required: true,
      },
      goalDescription: {
        type: String,
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    "ar-BH": {
      goalTitle: {
        type: String,
        required: true,
      },
      goalDescription: {
        type: String,
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goals", GoalSchema);
