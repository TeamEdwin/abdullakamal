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
  getOneById,
  getOne,
  getOneBySlug,
  getTopStories,
} = require("../controllers/department-controller");
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

router.get("/department/id/:id", async (req, res) => {
  await getOneById(req, res);
});

router.get("/department/:slug", async (req, res) => {
  await getOne(req, res);
});

router.get("/department", async (req, res) => {
  await getAll(req, res);
});

router.post(
  "/department",
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

router.post(
  "/department",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
    await addOne(req, res);
  }
);
router.put(
  "/department/:id",
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
  "/department/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  validate,

  async (req, res) => {
    await updateOne(req, res);
  }
);

router.get("/department/:id", async (req, res) => {
  await getOne(req, res);
});

router.delete(
  "/department/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeOne(req, res);
  }
);

module.exports = router;
