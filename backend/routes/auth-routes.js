const router = require("express").Router();
const {validationRules, validate} = require("../validations/user-validator");
const { login, register, verify, forgotPassword, resetPassword, changePassword } = require("../controllers/auth-controller");
const { ensureAuthenticated } = require("../middleware/auth-middleware");
const { validationRules: passwordValidationRules, validate: passwordValidate } = require("../validations/change-password-validator");

router.post('/login', async (req, res) => {

    await login(req.body, res);
});

router.post('/register', validationRules(), validate, async (req, res) => {
  

    await register(req.body, req.body.role, res);
});

router.post('/verify', async (req, res) => {
   
    await verify(req.body, res);
});

router.post('/forgotPassword', async (req, res) => {
   
 
    await forgotPassword(req.body, res);
});

router.post('/resetPassword', passwordValidationRules(), passwordValidate, async (req, res) => {
  
    await resetPassword(req.body, res);
});

router.post("/changePassword", ensureAuthenticated, passwordValidationRules(), passwordValidate, async (req, res) => {   
 
    await changePassword(req, res);
});

module.exports = router;