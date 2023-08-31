const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    "en-US": {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      designation: {
        type: String,
        required: true,
      },
      qualification: {
        type: String,
        required: true,
      },
    },
    "ar-BH": {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
      },
      designation: {
        type: String,
        required: true,
      },
      qualification: {
        type: String,
        required: true,
      },
    },
    slug: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
    departmentID: [{ type: Schema.Types.ObjectId, ref: "Department" }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

DoctorSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Doctor", DoctorSchema);
