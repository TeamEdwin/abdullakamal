const paginate = require("express-paginate");
const mongoose = require("mongoose");
const Appointment = require("../models/appointment");
const Slot = require("../models/slot");
const appointmentDate = require("../models/date");
const sgMail = require("@sendgrid/mail");
const dayjs = require("dayjs");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const formatDate = (isoString) => {
  return dayjs(isoString).format("MMM DD, YYYY");
};

const formatTime = (isoString) => {
  return dayjs(isoString).format("hh:mmA Z");
};

const createAppointment = async (req, res) => {
  try {
    const { doctor, slot, patientName, patientPhone, patientEmail } = req.body;

    const appointmentExists = await Appointment.findOne({
      doctor: doctor,
      slot: slot,
    });
    if (appointmentExists) {
      return res.status(400).json({
        message: "Appointment already booked. Please select other slot.",
        success: false,
      });
    }
    const appointment = await Appointment.create({
      doctor,
      slot,
      patientName,
      patientPhone,
      patientEmail,
    });

    try {
      const appointmentData = await Appointment.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(appointment.id),
          },
        },
        {
          $lookup: {
            from: "slots",
            localField: "slot",
            foreignField: "_id",
            as: "slot",
          },
        },
        {
          $lookup: {
            from: "doctors",
            localField: "doctor",
            foreignField: "_id",
            as: "doctor",
          },
        },
        {
          $lookup: {
            from: "appointmentdates",
            localField: "slot.date",
            foreignField: "_id",
            as: "date",
          },
        },
        {
          $group: {
            _id: "$_id",
            doctor: { $first: "$doctor" },
            slot: { $first: "$slot" },
            date: { $first: "$date" },
            patientName: { $first: "$patientName" },
            patientPhone: { $first: "$patientPhone" },
            patientEmail: { $first: "$patientEmail" },
          },
        },
        {
          $project: {
            _id: 1,
            doctorName: "$doctor",
            appointmentDate: "$date.date",
            appointmentStartTime: "$slot.startTime",
            appointmentEndTime: "$slot.endTime",
            patientName: 1,
            patientPhone: 1,
            patientEmail: 1,
          },
        },
      ]);
      if (!appointmentData) {
        return res.status(404).json({
          message: "Appointment not found",
          success: false,
        });
      }

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: patientEmail,
        subject: "AKMC Appointment",
        html: `<h3>Dear ${patientName}</h3>
        <p>Your appointment at Dr. Abdulla Kamal Medical Center is Booked Successfully. <br />
        <h4>Appointment Details </h4>
        Doctor's Name: ${appointmentData[0].doctorName[0]["en-US"].firstname} ${appointmentData[0].doctorName[0]["en-US"].lastname} <br />
        Date / Time: ${formatDate(appointmentData[0].appointmentDate)} at ${formatTime(appointmentData[0].appointmentStartTime)} </br>
        <p>We'll see you then!. </p>
        <p> Please visit the website for more information. </p>
        <p>Thank you<br />
        Dr. Abdulla Kamal Medical Center</p>`,
      };

      const data = await sgMail.send(emailData);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        success: false,
      });
    }

    return res.status(201).json({
      message: "Appointment created successfully",
      success: true,
      appointment,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Appointment.aggregate([
        {
          $lookup: {
            from: "slots",
            localField: "slot",
            foreignField: "_id",
            as: "slot",
          },
        },
        {
          $lookup: {
            from: "doctors",
            localField: "doctor",
            foreignField: "_id",
            as: "doctor",
          },
        },
        {
          $lookup: {
            from: "appointmentdates",
            localField: "slot.date",
            foreignField: "_id",
            as: "date",
          },
        },
        {
          $group: {
            _id: "$_id",
            doctor: { $first: "$doctor" },
            slot: { $first: "$slot" },
            date: { $first: "$date" },
            patientName: { $first: "$patientName" },
            patientPhone: { $first: "$patientPhone" },
            patientEmail: { $first: "$patientEmail" },
          },
        },
        {
          $project: {
            _id: 1,
            doctorName: "$doctor",
            appointmentDate: "$date.date",
            appointmentStartTime: "$slot.startTime",
            appointmentEndTime: "$slot.endTime",
            patientName: 1,
            patientPhone: 1,
            patientEmail: 1,
          },
        },
        {
          $sort: {
            appointmentStartTime: 1,
          },
        },
      ]),
      Appointment.countDocuments({}),
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);

    return res.send({
      appointments: results,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getAppointmentById = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const appointment = await Appointment.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "slots",
          localField: "slot",
          foreignField: "_id",
          as: "slot",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctor",
          foreignField: "_id",
          as: "doctor",
        },
      },
      {
        $lookup: {
          from: "appointmentdates",
          localField: "slot.date",
          foreignField: "_id",
          as: "date",
        },
      },
      {
        $group: {
          _id: "$_id",
          doctor: { $first: "$doctor" },
          slot: { $first: "$slot" },
          date: { $first: "$date" },
          patientName: { $first: "$patientName" },
          patientPhone: { $first: "$patientPhone" },
          patientEmail: { $first: "$patientEmail" },
        },
      },
      {
        $project: {
          _id: 1,
          doctorName: "$doctor",
          appointmentDate: "$date.date",
          appointmentStartTime: "$slot.startTime",
          appointmentEndTime: "$slot.endTime",
          patientName: 1,
          patientPhone: 1,
          patientEmail: 1,
        },
      },
    ]);
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
        success: false,
      });
    }
    return res.status(200).json({
      appointment,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getAppointmentByDoctorAndDate = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const date = await appointmentDate
      .findOne({ date: req.params.date })
      .select("_id");
    if (!date) {
      return res.status(200).json({
        message: "Date not found",
        success: false,
        appointments: [],
      });
    }
    const slot = await Slot.find({ date: date._id }).select("_id");

    const results = await Appointment.aggregate([
      {
        $match: {
          doctor: mongoose.Types.ObjectId(req.params._id),
          slot: { $in: slot.map((s) => s._id) },
        },
      },
      {
        $lookup: {
          from: "slots",
          localField: "slot",
          foreignField: "_id",
          as: "slot",
        },
      },
      {
        $unwind: "$slot",
      },
      {
        $lookup: {
          from: "appointmentdates",
          localField: "slot.date",
          foreignField: "_id",
          as: "date",
        },
      },
      {
        $unwind: "$date",
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctor",
          foreignField: "_id",
          as: "doctor",
        },
      },
      {
        $unwind: "$doctor",
      },
      {
        $group: {
          _id: "$_id",
          slot: { $first: "$slot" },
          date: { $first: "$date" },
          patientName: { $first: "$patientName" },
          patientPhone: { $first: "$patientPhone" },
          patientEmail: { $first: "$patientEmail" },
          doctor: { $first: "$doctor" },
        },
      },
      {
        $project: {
          _id: 1,
          doctorName: "$doctor",
          appointmentDate: "$date.date",
          appointmentStartTime: "$slot.startTime",
          appointmentEndTime: "$slot.endTime",
          patientName: 1,
          patientPhone: 1,
          patientEmail: 1,
        },
      },
      {
        $sort: {
          appointmentStartTime: 1,
        },
      },
    ]);
    return res.send({
      appointments: results,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const updateAppointment = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const { doctor, slot, patientName, patientPhone, patientEmail } = req.body;
    const appointment = await Appointment.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
        success: false,
      });
    }
    await appointment.update({
      doctor,
      slot,
      patientName,
      patientPhone,
      patientEmail,
    });
    return res.status(200).json({
      message: "Appointment updated successfully",
      success: true,
      appointment,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const deleteAppointment = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    return res.status(501).json({
      message: "Invalid ID",
      success: false,
    });
  }

  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
        success: false,
      });
    }
    await appointment.delete();
    return res.status(200).json({
      message: "Appointment deleted successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointmentByDoctorAndDate,
};
