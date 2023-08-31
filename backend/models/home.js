const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HomeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },
    testimonial: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Home", HomeSchema);
