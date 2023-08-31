const {  model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ContactSchema = new Schema(
    {
        name: {
            type: String,
        },
        mobile: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports =mongoose. model("Contact", ContactSchema);
