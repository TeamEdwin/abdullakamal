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
  getOneById,
  getOne,
  getOneBySlug,
  getTopStories,
} = require("../controllers/health-controller");
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

router.get("/health/id/:id", async (req, res) => {
  await getOneById(req, res);
});


router.get("/health", async (req, res) => {
  await getAll(req, res);
});

router.post(
  "/health",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  upload.fields([
    {
      name: "svgImage",
      maxCount: 1,
    },
  ])
);

router.post(
  "/health",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
  
    await addOne(req, res);
  }
);
router.put(
  "/health/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  upload.fields([
    {
      name: "svgImage",
      maxCount: 1,
    },
  ])
);

router.put(
  "/health/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),


  async (req, res) => {
    await updateOne(req, res);
  }
);

router.get("/health/:id", async (req, res) => {
  await getOne(req, res);
});

router.delete(
  "/health/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeOne(req, res);
  }
);

module.exports = router;
