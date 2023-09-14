const router = require("express").Router();

const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");

const {
  createSession,
  purchagedPackage,
  getAllPurchagedPackage,
} = require("../controllers/mastercard-controller");

router.post("/create-session", async (req, res) => {
  await createSession(req, res);
});

// CREATE - PACKAGE SERVICE Purchased
router.post("/purchased-packages", async (req, res) => {
  await purchagedPackage(req, res);
});

// READ ALL - PACKAGE SERVICE Purchased
router.get("/purchased-packages", async (req, res) => {
  await getAllPurchagedPackage(req, res);
});

module.exports = router;
