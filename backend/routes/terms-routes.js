const router = require("express").Router();
const paginate = require("express-paginate");
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");
const { register } = require("../controllers/auth-controller");

const {
  getAll,

  createTerms,
} = require("../controllers/terms-controller");

router.get("/terms", async (req, res) => {
  await getAll(req, res);
});

router.post(
  "/terms",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
    await createTerms(req, res);
  }
);

module.exports = router;
