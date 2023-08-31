const {  model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
{  "en-US":{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  
  },
  "ar-BH": {
    title: {
      type: String,
      required: true,
    },
    
    description: {
      type: String,
    },
   
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},
  { timestamps: true }
);

CategorySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Category", CategorySchema);
