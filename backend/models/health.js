const {  model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HealthSchema = new Schema(
  {
    healthTitle: {
      type: String,
      required: true,
    },
  
    description: {
      type: String,
      required: true,
    },
    svgImage: {
      type: String,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

HealthSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Health", HealthSchema);
