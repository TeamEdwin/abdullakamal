const {  model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TermSchema = new Schema(
  {
    termsText : {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

TermSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Term", TermSchema);
