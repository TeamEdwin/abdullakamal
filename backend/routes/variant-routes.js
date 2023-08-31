const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middleware/auth-middleware");

const {
  addOne,
  removeOne,
  updateOne,
  getAll,
  getOne,
  getOneBySlug,
  getTopStories,
  getVariantsByPackageId,
} = require("../controllers/variant-controller");
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

router.get("/variant/:id", async (req, res) => {
  await getOne(req, res);
});

router.get("/variant", async (req, res) => {
  await getAll(req, res);
});

router.post(
  "/variant",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  upload.any("files")
);

router.post(
  "/variant",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
    await addOne(req, res);
  }
);
router.put(
  "/variant/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "svgImage",
      maxCount: 1,
    },
  ])
);

router.put(
  "/variant/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
    await updateOne(req, res);
  }
);

router.get("/variant/:id", async (req, res) => {
  await getOne(req, res);
});

router.delete(
  "/variant/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
 
    await removeOne(req, res);
  }
);

router.get(
  "/getVariantsById/:id",

  async (req, res) => {
    await getVariantsByPackageId(req, res);
  }
);

module.exports = router;
