const express = require("express");
const router = express.Router();
const WalletController = require("../controllers/wallet.controller");

router.post("/topup", WalletController.topupWallet);
router.post("/airtime", WalletController.topupAirTime);
router.post("/transfer", WalletController.transfer);

// Works for both /history/:userId and /history/:user_id
router.get("/history/:userId", WalletController.getHistory);
router.get("/balance/:userId", WalletController.getBalance);
module.exports = router;