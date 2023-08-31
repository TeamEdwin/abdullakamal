const { model, Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PackagePurchasedSchema = new Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    package_id: {
      type: Schema.Types.ObjectId,
      ref: "Package",
    },
    variant_id: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    customer_phone: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

PackagePurchasedSchema.plugin(uniqueValidator);
module.exports = model("PackagePurchased", PackagePurchasedSchema);
