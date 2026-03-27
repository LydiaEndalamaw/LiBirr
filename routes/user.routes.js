const app = require("express");
const router = app.Router();

const userController = require("../controllers/user.controller")

router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)

module.exports = router;