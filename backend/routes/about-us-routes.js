const router = require("express").Router();
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");
const { register } = require("../controllers/auth-controller");

const {
  getAll,
  
  createAboutUs
  
  
} = require("../controllers/about-us-controller");

router.get(
  "/aboutUs",
  async (req, res) => {
    

    await getAll(req, res);
  }
);


router.post(
  "/aboutUs",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
  
    await createAboutUs(req, res);
  }
);



module.exports = router;
