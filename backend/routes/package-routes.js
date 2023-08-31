const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");
const { validate } = require("../validations/story-validator");
const {
  addOne,
  removeOne,
  updateOne,
  getAll,
  getOne,
  getOneBySlug,
  getTopStories,
  // purchagedPackage,
} = require("../controllers/package-controller");
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

router.get("/packages", async (req, res) => {
  await getAll(req, res);
});

router.post(
  "/packages",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  upload.any("files")
);

router.post(
  "/packages",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  validate,
  async (req, res) => {
    await addOne(req, res);
  }
);

router.put(
  "/packages/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  upload.any("files"),
  validate,
  async (req, res) => {
    await updateOne(req, res);
  }
);

router.get("/packages/:id", async (req, res) => {
  await getOne(req, res);
});

router.delete(
  "/packages/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeOne(req, res);
  }
);

// router.post("/purchased-packages", async (req, res) => {
//   await purchagedPackage(req, res);
// });

module.exports = router;
