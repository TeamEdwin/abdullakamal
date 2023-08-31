const {  model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const InsuranceSchema = new Schema(
  {
   
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

InsuranceSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Insurance", InsuranceSchema);
