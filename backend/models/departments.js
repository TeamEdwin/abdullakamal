const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema(
  {
    "en-US": {
      departmentName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    "ar-BH": {
      departmentName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    slug: {
      type: String,
    },
    coverImage: {
      type: String,
      required: true,
    },
    coverImageId: {
      type: String,
      required: true,
    },
    svgImage: {
      type: String,
      required: true,
    },
    svgImageId: {
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

DepartmentSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Department", DepartmentSchema);
