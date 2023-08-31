const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const VariantSchema = new Schema(
  {
    "en-US": {
      title: {
        type: String,
        required: true,
      },
      description: { type: String, required: true },
    },
    "ar-BH": {
      title: {
        type: String,
        required: true,
      },
      description: { type: String, required: true },
    },
    price: {
      type: String,
    },
    currency: {
      type: String,
      // required: true,
    },
    packageID: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

VariantSchema.plugin(uniqueValidator);
module.exports = model("Variant", VariantSchema);
