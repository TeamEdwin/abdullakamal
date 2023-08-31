const router = require("express").Router();
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");
const { register } = require("../controllers/auth-controller");
const {
  getAll,
  getOne,
  contactUs,
  getAllContact,
  getContactById,
} = require("../controllers/admin-controller");
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentByDoctorAndDate,
} = require("../controllers/appointment-controller");
const {
  addSlot,
  addSlotMultiple,
  getAllSlots,
  getOneSlot,
  updateSlot,
  deleteSlot,
  getSlotsByDoctor,
  getSlotsByDate,
  getSlotsByDoctorAndDate,
} = require("../controllers/slot-controller");

// READ Users
router.get(
  "/users",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await getAll(req, res);
  }
);

// READ Users - By Id
router.get("/users/:id", async (req, res) => {
  await getOne(req, res);
});

router.get("/seed", async (req, res) => {
  const admin = {
    name: "Administrator",
    email: "admin@markscodingspot.com",
    password: "Password123#",
  };
  await register(admin, "admin", res);
});

// CREATE Slot
router.post("/slots", async (req, res) => {
  await addSlot(req, res);
});

// CREATE Slot Multiple
router.post("/slotsmultiple", async (req, res) => {
  await addSlotMultiple(req, res);
});

// READ Slot - ALL
router.get("/slots", async (req, res) => {
  await getAllSlots(req, res);
});

// READ Slot - By Id
router.get("/slots/:id", async (req, res) => {
  await getOneSlot(req, res);
});

// UPDATE Slot
router.put("/slots/:id", async (req, res) => {
  await updateSlot(req, res);
});

// DELETE Slot
router.delete("/slots/:id", async (req, res) => {
  await deleteSlot(req, res);
});

// READ Slot - By Doctor
router.get("/slots/doctor/:doctor", async (req, res) => {
  await getSlotsByDoctor(req, res);
});

// READ Slot - By Doctor and Date
router.get("/slots/doctor/:doctor/date/:date", async (req, res) => {
  await getSlotsByDoctorAndDate(req, res);
});
router.get("/slots/date/:date", async (req, res) => {
  await getSlotsByDate(req, res);
});

// CREATE Appointment
router.post("/appointment", async (req, res) => {
  await createAppointment(req, res);
});

// READ Appointment - ALL
router.get("/appointment", async (req, res) => {
  await getAllAppointments(req, res);
});

router.delete("/appointment/:id", async (req, res) => {
  await deleteAppointment(req, res);
});

// READ Appointment - By ID
router.get("/appointment/:id", async (req, res) => {
  await getAppointmentById(req, res);
});

// UPDATE Appointment
router.put("/appointment/:id", async (req, res) => {
  await updateAppointment(req, res);
});

// READ Appointment - By Doctor & Date
router.get("/appointmentbydoctoranddate/:_id/:date", async (req, res) => {
  await getAppointmentByDoctorAndDate(req, res);
});

// CREATE Contact Message
router.post("/contact-us", async (req, res) => {
  await contactUs(req, res);
});

// READ Contact Message - ALL
router.get("/contact-us", async (req, res) => {
  await getAllContact(req, res);
});

// READ Contact Message - By Id
router.get("/contact-us/:id", async (req, res) => {
  await getContactById(req, res);
});

module.exports = router;
