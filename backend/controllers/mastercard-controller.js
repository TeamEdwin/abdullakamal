const PackagePurchased = require("../models/package_purchased");
const axios = require("axios");
const { Buffer } = require("buffer");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const createSession = async (req, res) => {
  try {
    const data = req.body; // Assuming you're receiving the necessary data in the request body
    const url = process.env.MASTERCARD_URL;
    const username = process.env.MASTERCARD_USERNAME;
    const password = process.env.MASTERCARD_PASSWORD;
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString(
      "base64"
    )}`;

    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        Authorization: authHeader,
        accept: "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log("Response:", response.data.session.id);
        res.status(200).json({
          message: "Session created successfully",
          success: true,
          sessionId: response.data.session.id,
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        res.status(500).json({
          message:
            "An error occurred while communicating with the Mastercard API.",
          success: false,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An internal server error occurred.",
      success: false,
    });
  }
};

// CREATE - PACKAGE SERVICE PURCHASED
const purchagedPackage = async (req, res) => {
  try {
    const body = req.body;
    const newRecord = await PackagePurchased({
      order_id: body.order_id,
      package_id: body.package_id,
      variant_id: body.variant_id,
      doctor_id: body.doctor_id,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      amount: body.amount,
    });

    await newRecord.save();

    const message = `
    <h3>Dear ${body.customer_name}</h3>
        <p>Thank you for choosing Dr. Abdulla Kamal Medical Center<br />
        Your package service is Purchased Successfully.</p><br />
        <strong>Order ID:</strong> ${body.order_id}<br />
        <strong>Amount:</strong> ${body.amount}<br />
        <strong>Package ID:</strong> ${body.package_id}<br />
        <strong>Variant ID:</strong> ${body.variant_id}<br />
        <strong>Doctor ID:</strong> ${body.doctor_id}<br /><br />
    <p>Please visit the website <a href="http://drabdullakamalclinic.com">www.drabdullakamalclinic.com</a> for more information. </p>
    Thank you<br />
    Dr. Abdulla Kamal Medical Center
    `;

    // send email to user
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: body.customer_email,
      subject: "Package service is successfully purchased",
      html: message,
    };

    const email = await sgMail.send(emailData);
    if (email) {
      console.log("Email sent to user");
    }

    return res.status(201).json({
      message: "Package Purchased successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// READ ALL - PACKAGE SERVICE Purchased
const getAllPurchagedPackage = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      PackagePurchased.find({})
        .sort({ createdAt: "descending" })
        .select({ __v: 0, createdAt: 0, updatedAt: 0 })
        .populate("doctor_id", "en-US")
        .populate("package_id", "en-US")
        .populate("variant_id", "en-US")
        .skip(req.skip)
        .lean()
        .exec(),
      PackagePurchased.count({}),
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);

    return res.status(201).json({
      object: "list",
      data: results,
      pageCount,
      itemCount,
      currentPage: req.query.page,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  createSession,
  purchagedPackage,
  getAllPurchagedPackage,
};
