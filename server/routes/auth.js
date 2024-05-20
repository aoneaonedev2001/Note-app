const express = require("express");
const router = express.Router();

//controller
const {register,login,currentCustomer} = require("../controllers/auth");

// middleware 
const { authCheck } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/current-customer",authCheck, currentCustomer);  

module.exports = router;
