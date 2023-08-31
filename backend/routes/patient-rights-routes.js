const router = require("express").Router();
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
} = require("../controllers/patients-right-controller");

router.get("/patientrights", async (req, res) => {
  await getAll(req, res);
});

router.post(
  "/patientrights",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
    await addOne(req, res);
  }
);

router.put(
  "/patientrights/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
    await updateOne(req, res);
  }
);

router.get("/patientrights/:id", async (req, res) => {
  await getOne(req, res);
});

router.delete(
  "/patientrights/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeOne(req, res);
  }
);

module.exports = router;
