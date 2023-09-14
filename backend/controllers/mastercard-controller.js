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
<table class="table-wrap is-billing">
  <tr>
    <th><strong>Order Id</strong></th>
    <td>
      <p>
        ${body.order_id}
      </p>
    </td>
  </tr>
  <tr>
    <th><strong>Amount</strong></th>
    <td>
      <p>${body.amount}</p>
    </td>
  </tr>
  <tr>
    <th><strong>Package</strong></th>
    <td>
      <p>${body.package_id}</p>
    </td>
  </tr>
  <tr>
    <th><strong>Variant</strong></th>
    <td>
      <p>${body.variant_id}</p>
    </td>
  </tr>
  <tr>
    <th><strong>Doctor</strong></th>
    <td>
      <p>${body.doctor_id}</p>
    </td>
  </tr>
  <tr>
    <th><strong>Your Email</strong></th>
    <td>
      <p>${body.customer_email}</p>
    </td>
  </tr>
  <tr>
    <th><strong>Name</strong></th>
    <td>
      <p>${body.customer_name}</p>
    </td>
  </tr>
  <tr>
    <th><strong>Mobile Phone</strong></th>
    <td>
      <p>${body.customer_phone}</p>
    </td>
  </tr>
</table>
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
        .sort({ createdAt: "ascending" })
        .select({ __v: 0, createdAt: 0, updatedAt: 0 })
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
