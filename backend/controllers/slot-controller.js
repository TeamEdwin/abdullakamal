const paginate = require("express-paginate");
const Slot = require("../models/slot");
const Doctor = require("../models/doctor");
const Date = require("../models/date");
const mongoose = require("mongoose");
const AppointmentDate = require("../models/date");

const addSlot = async (req, res) => {
  try {
    // add date to date collection
    const { appointmentDate, doctor, startTime, endTime } = req.body;
    // calculate duration using startTime and endTime
    // endTime = new Date(endTime);
    // startTime = new Date(startTime);
    // const duration = endTime - startTime;
    // check if date exists
    const dateExists = await Date.findOne({ date: appointmentDate });
    if (dateExists) {
      // check if slot exists
      const slotExists = await Slot.findOne({
        date: dateExists._id,
        doctor: doctor,
        startTime: startTime,
        endTime: endTime,
      });
      if (slotExists) {
        return res.status(400).json({
          message: "Slot already exists",
          success: false,
        });
      }
      // create slot
      await Slot.create({
        date: dateExists._id,
        doctor,
        startTime,
        endTime,
      });
      return res.status(201).json({
        message: "Slot added successfully",
        success: true,
      });
    }
    // create date

    const newDate = await Date.create({
      date: appointmentDate,
    });
    // add slot to slot collection
    await Slot.create({
      date: newDate._id,
      doctor,
      startTime,
      endTime,
    });
    return res.status(201).json({
      message: "Slot added successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const addSlotMultiple = async (req, res) => {
  try {
    const { slotDates, doctor, startTime, endTime } = req.body;
    // foreach slotDates check if date is already there
    // if not then create a new date
    // then create a new slot
    // if date is already there then create a new slot
    // convert time to ISO

    for (let i = 0; i < slotDates.length; i++) {
      const date = await Date.findOne({
        date: slotDates[i],
      });
      if (date) {
        // check if slot is already there
        // check startTime and endTime is not between already
        // existing slot
        const slot = await Slot.findOne({
          date: date._id,
          doctor,
          startTime,
          endTime,
        });
        if (slot) {
          return res.status(400).json({
            message: "Slot already exists",
            success: false,
          });
        }
        const newSlot = await Slot.create({
          date: date._id,
          doctor,
          startTime,
          endTime,
        });
      } else {
        const newDate = await Date.create({
          date: slotDates[i],
        });
        const slot = await Slot.create({
          date: newDate._id,
          doctor,
          startTime,
          endTime,
        });
      }
    }
    return res.status(200).json({
      message: "Slot added successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.aggregate([
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
          localField: "date",
          foreignField: "_id",
          as: "date",
        },
      },
      {
        $group: {
          _id: "$_id",
          doctor: { $first: "$doctor" },
          date: { $first: "$date" },
          startTime: { $first: "$startTime" },
          endTime: { $first: "$endTime" },
          isBooked: { $first: "$isBooked" },
        },
      },
      {
        $project: {
          _id: 1,
          doctorName: "$doctor",
          date: "$date.date",
          startTime: 1,
          endTime: 1,
          isBooked: 1,
        },
      },
    ]);
    return res.status(200).json({
      object: "list",
      data: slots,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getOneSlot = async (req, res) => {
  try {
    const item = await Slot.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
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
          localField: "date",
          foreignField: "_id",
          as: "date",
        },
      },
      {
        $group: {
          _id: "$_id",
          doctor: { $first: "$doctor" },
          date: { $first: "$date" },
          startTime: { $first: "$startTime" },
          endTime: { $first: "$endTime" },
          isBooked: { $first: "$isBooked" },
        },
      },
      {
        $project: {
          _id: 1,
          doctorName: "$doctor",
          date: "$date.date",
          startTime: 1,
          endTime: 1,
          isBooked: 1,
        },
      },
    ]);
    if (item) {
      return res.status(200).json(item);
    }
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const updateSlot = async (req, res) => {
  try {
    const { date, doctor, startTime, endTime } = req.body;
    const item = await Slot.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (item) {
      await item.update({
        date,
        doctor,
        startTime,
        endTime,
      });
      return res.status(200).json({
        message: "Slot updated successfully",
        success: true,
      });
    }
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const deleteSlot = async (req, res) => {
  try {
    const item = await Slot.findById(req.params.id);
    if (item) {
      await item.delete();
      return res.status(200).json({
        message: "Slot deleted successfully",
        success: true,
      });
    }
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getSlotsByDoctor = async (req, res) => {
  try {
    const slots = await Slot.aggregate([
      {
        $match: {
          doctor: mongoose.Types.ObjectId(req.params.doctor),
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
          localField: "date",
          foreignField: "_id",
          as: "date",
        },
      },
      {
        $group: {
          _id: "$_id",
          doctor: { $first: "$doctor" },
          date: { $first: "$date" },
          startTime: { $first: "$startTime" },
          endTime: { $first: "$endTime" },
          isBooked: { $first: "$isBooked" },
        },
      },
      {
        $project: {
          _id: 1,
          doctorName: "$doctor",
          date: "$date.date",
          startTime: 1,
          endTime: 1,
          isBooked: 1,
        },
      },
    ]);
    return res.status(200).json({
      object: "list",
      data: slots,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getSlotsByDate = async (req, res) => {
  try {
    const date = await AppointmentDate.findOne({
      date: req.params.date,
    });
    if (date) {
      const item = await Slot.aggregate([
        {
          $match: {
            date: mongoose.Types.ObjectId(date.id),
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
            localField: "date",
            foreignField: "_id",
            as: "date",
          },
        },
        {
          $group: {
            _id: "$_id",
            doctor: { $first: "$doctor" },
            date: { $first: "$date" },
            startTime: { $first: "$startTime" },
            endTime: { $first: "$endTime" },
          },
        },
        {
          $project: {
            _id: 1,
            doctorName: "$doctor",
            date: "$date.date",
            startTime: 1,
            endTime: 1,
          },
        },
      ]);
      return res.status(200).json({
        object: "list",
        data: item,
      });
    }
    return res.status(200).json({
      message: "Date not found",
      success: false,
      data: [],
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getSlotsByDoctorAndDate = async (req, res) => {
  try {
    const date = await AppointmentDate.findOne({ date: req.params.date });
    if (date) {
      const item = await Slot.aggregate([
        {
          $match: {
            date: mongoose.Types.ObjectId(date.id),
            doctor: mongoose.Types.ObjectId(req.params.doctor),
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
            localField: "date",
            foreignField: "_id",
            as: "date",
          },
        },
        {
          $group: {
            _id: "$_id",
            doctor: { $first: "$doctor" },
            date: { $first: "$date" },
            startTime: { $first: "$startTime" },
            endTime: { $first: "$endTime" },
          },
        },
        {
          $sort: {
            startTime: 1,
          },
        },
        {
          $project: {
            _id: 1,
            doctorName: "$doctor",
            date: "$date.date",
            startTime: 1,
            endTime: 1,
          },
        },
      ]);
      return res.status(200).json({
        object: "list",
        data: item,
      });
    }
    return res.status(200).json({
      message: "Date not found",
      success: false,
      data: [],
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  addSlot,
  addSlotMultiple,
  getAllSlots,
  getOneSlot,
  updateSlot,
  deleteSlot,
  getSlotsByDoctor,
  getSlotsByDate,
  getSlotsByDoctorAndDate,
};
