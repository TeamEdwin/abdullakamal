const {  model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GallerySchema = new Schema(
  {
    imagetitle: {
      type: String,
    },
    imageDescription: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
    },
  },
  { timestamps: true }
);

GallerySchema.plugin(uniqueValidator);
module.exports =mongoose. model("Gallery", GallerySchema);
