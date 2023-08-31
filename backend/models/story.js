const { model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StorySchema = new Schema(
  {
    "en-US": {
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    },
    "ar-BH": {
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

StorySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Story", StorySchema);
