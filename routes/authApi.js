const express = require("express");

const router = express.Router();

const { catchErrors } = require("../handlers/errorHandlers");
const {
  isValidToken,
  login,
  logout,
} = require("../controllers/authController");

// const { loginDemo } = require("../controllers/authControllerDemo");

// for development & production don't use this line router.route("/login").post(catchErrors(loginDemo)); (you should remove it) , this is just demo login contoller
// router.route("/login").post(catchErrors(loginDemo));

// use {login } from authController , uncomment line below
router.route("/").get((req,res)=>{
  res.json({
    success:true,
    msg:"API is working"
  })
})
router.route("/login").post(catchErrors(login));
router.route("/logout").post(isValidToken, catchErrors(logout));

module.exports = router;
