const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HealthPointsSchema = new Schema(
  {
    "en-US": {
      points: {
        type: String,
        required: true,
      },
    },
    "ar-BH": {
      points: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthPoints", HealthPointsSchema);
