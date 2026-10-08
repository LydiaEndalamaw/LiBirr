const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller"); // 👈 Double check this path matches your directory

// Express crashes if these functions evaluate to undefined. 
// We point them directly to our class's static methods.
router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;