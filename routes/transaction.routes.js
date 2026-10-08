const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transaction.controller"); // Or check your exact filename style

// Fetch transaction history for a specific user
router.get("/history/:userId", TransactionController.getHistory);

module.exports = router;