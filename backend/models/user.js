const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "no-image.png",
    },
    imageId: {
      type: String,
     
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "maintainer"],
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: Number,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetCode: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);

