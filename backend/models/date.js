const { Schema, model } = require("mongoose");

const AppointmentDateSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("AppointmentDate", AppointmentDateSchema);
