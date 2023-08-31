const {  model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
