const router = require("express").Router();
const {
  createSession,
  purchagedPackage,
} = require("../controllers/mastercard-controller");
router.post("/create-session", async (req, res) => {
  await createSession(req, res);
});

router.post("/purchased-packages", async (req, res) => {
  await purchagedPackage(req, res);
});

module.exports = router;
