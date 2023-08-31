const router = require("express").Router();

const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");

const {
  addOne,
  getAll,
  addPoints,
  removeTestimonial,
  removeHealth,
} = require("../controllers/testimonial-controller");

router.post(
  "/testimonial",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await addOne(req, res);
  }
);
router.post(
  "/fitness",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await addPoints(req, res);
  }
);
router.delete(
  "/testimonial/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeTestimonial(req, res);
  }
);
router.delete(
  "/fitness/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeHealth(req, res);
  }
);

router.get("/home", async (req, res) => {
  await getAll(req, res);
});

module.exports = router;
