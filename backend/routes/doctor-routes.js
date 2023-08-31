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
  getDocterByDepId,
  getDocterByDepSlug,
} = require("../controllers/doctor-controller");
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

router.get("/doctors", async (req, res) => {
  await getAll(req, res);
});

router.post(
  "/doctors",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  upload.any("files")
);
router.post(
  "/doctors",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  validate,
  async (req, res) => {
    await addOne(req, res);
  }
);

router.put(
  "/doctors/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  upload.any("files"),

  async function (req, res) {
    await updateOne(req, res);
  }
);
router.get("/doctors/:id", async (req, res) => {
  await getOne(req, res);
});

router.delete(
  "/doctors/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeOne(req, res);
  }
);

router.get(
  "/getdocbydepid/:id",

  async (req, res) => {
    await getDocterByDepId(req, res);
  }
);

router.get(
  "/getdocbydepslug/:slug",

  async (req, res) => {
    await getDocterByDepSlug(req, res);
  }
);

module.exports = router;
