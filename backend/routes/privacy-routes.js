const router = require("express").Router();
const paginate = require("express-paginate");
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");
const { register } = require("../controllers/auth-controller");

const {
  getAll,
  
  createPrivacy

  
} = require("../controllers/privacy-controller");

router.get(
  "/privacy",
  async (req, res) => {
    await getAll(req, res);
  }
);

router.post(
  "/privacy",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
  
    await createPrivacy(req, res);
  }
);



module.exports = router;
