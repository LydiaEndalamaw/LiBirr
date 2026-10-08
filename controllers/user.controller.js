const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const bcrypt = require("bcrypt"); 

class UserController {
  // 1. User Registration Method (Email-Only)
  static register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "All registration fields are required" });
      }

      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: "Email address is already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      // Automatically spin up a starting wallet with a generated wallet number
      await Wallet.create({
        user_id: newUser.id,
        balance: 0.0,
        walletNumber: "LIB-" + Date.now(),
      });

      const userResponse = newUser.toJSON();
      delete userResponse.password;

      return res.status(201).json({
        message: "User registered successfully",
        user: userResponse,
      });
    } catch (error) {
      console.error("Registration Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  // 2. User Login Method
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const wallet = await Wallet.findOne({ where: { user_id: user.id } });

      return res.status(200).json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
        balance: wallet ? Number(wallet.balance) : 0.0,
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = UserController;