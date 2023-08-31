const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const AppointmentSchema = new Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    doctorName: {
      type: String,
      // required: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
    },
    patientName: {
      type: String,
      required: true,
    },
    patientPhone: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
AppointmentSchema.plugin(uniqueValidator);
module.exports = model("Appointment", AppointmentSchema);
