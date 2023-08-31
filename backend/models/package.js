const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VariantSchema = new Schema(
  {
    "en-US": {
      title: {
        type: String,
        required: true,
      },
      description: { type: String, required: true },
    },
    "ar-BH": {
      title: {
        type: String,
        required: true,
      },
      description: { type: String, required: true },
    },
    price: {
      type: String,
    },
    currency: {
      type: String,
      required: true,
    },
    packageID: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const PackageSchema = new Schema(
  {
    "en-US": {
      title: {
        type: String,
        required: true,
      },
      description: { type: String, required: true },
    },
    "ar-BH": {
      title: {
        type: String,
        required: true,
      },
      description: { type: String, required: true },
    },
    slug: {
      type: String,
    },
    departmentID: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      // required: true,
    },
    department: {
      type: String,
    },
    packageImage: {
      type: String,
    },
    packageImageId: {
      type: String,
    },
    associatedDoctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
    variants: [VariantSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

PackageSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Package", PackageSchema);
