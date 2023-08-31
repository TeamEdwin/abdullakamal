const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientRightsSchema = new Schema(
  {
    "en-US": {
      patientsRightsTitle: {
        type: String,
        required: true,
      },
      patientsRightsDescription: {
        type: String,
        required: true,
      },
    },
    "ar-BH": {
      patientsRightsTitle: {
        type: String,
        required: true,
      },
      patientsRightsDescription: {
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

module.exports = mongoose.model("PatientRights", PatientRightsSchema);
