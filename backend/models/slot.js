const { Schema, model } = require("mongoose");

const SlotSchema = new Schema(
  {
    date: {
      type: Schema.Types.ObjectId,
      ref: "AppointmentDate",
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Slot", SlotSchema);
