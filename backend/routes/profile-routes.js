const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const { ensureAuthenticated ,ensureAuthorized} = require("../middleware/auth-middleware");
const {
  validationRules,
  validate,
} = require("../validations/update-user-validator");
const { getOne, updateOne ,removeOne } = require("../controllers/profile-controller");


const PATH = "../public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, PATH));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    req.body.image = fileName;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/profile", 
ensureAuthenticated, async (req, res) => {
  await getOne(req, res);
});

router.put(
  "/profile/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin","maintainer"]),
  upload.any("files"),

  async (req, res) => {

    
    await updateOne(req, res);
  }
);
router.delete(
  "/profile/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeOne(req, res);
  }
);

module.exports = router;
