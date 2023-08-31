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
} = require("../controllers/goals-controller");

router.get("/goals", async (req, res) => {
  await getAll(req, res);
});

router.post(
  "/goals",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),

  async (req, res) => {
    await addOne(req, res);
  }
);

router.put(
  "/goals/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
 

  async (req, res) => {
    await updateOne(req, res);
  }
);

router.get("/goals/:id", async (req, res) => {
  await getOne(req, res);
});

router.delete(
  "/goals/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await removeOne(req, res);
  }
);

module.exports = router;
