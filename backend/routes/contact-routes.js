const router = require("express").Router();
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");

const {
  addOne,
  removeOne,
  getAll,
} = require("../controllers/contact-controller");

router.get("/contact", async (req, res) => {
  await getAll(req, res);
});

router.post(
  "/contact",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
    await addOne(req, res);
  }
);

router.delete(
  "/delete/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeOne(req, res);
  }
);

module.exports = router;
