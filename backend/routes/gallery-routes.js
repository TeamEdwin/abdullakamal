const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const cloudinary = require("../cloudinary/cloudinary");
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");

const {
  addOne,
  getAll,
  removeOne,
} = require("../controllers/gallery-controller");
const PATH = "../public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, PATH));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    req.body.imageUrl = fileName;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});


router.post(
  "/gallery",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  upload.any("files"),
);

router.post(
  "/gallery",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  

  async (req, res) => {
   
    await addOne(req, res);
  }
);

router.get("/gallery", async (req, res) => {
  await getAll(req, res);
});

router.delete(
  "/gallery/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
  
    await removeOne(req, res);
  }
);

module.exports = router;
