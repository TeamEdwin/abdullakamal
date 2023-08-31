require("dotenv").config();
const cors = require("cors");
const express = require("express");
const paginate = require("express-paginate");
const passport = require("passport");
const { connect } = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

const app = express();
const router = require("./routes/index");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
  });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
require("./middleware/passport-middleware")(passport);

app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));
app.use(router);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const runApp = async () => {
  try {
    await connect(process.env.MONGO_DB, {});

    console.log(`Successfully connected to database ${process.env.MONGO_DB}`);
    app.listen(process.env.PORT, () => {
      console.log(`Server started successfully on PORT ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    runApp();
  }
};

runApp();
