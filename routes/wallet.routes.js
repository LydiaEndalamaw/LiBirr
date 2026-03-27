const app = require("express");
const router = app.Router();

const WalletController = require("../controllers/wallet.controller")

router.post("/create",WalletController.creatWallet)
router.get("/checkBalance",WalletController.checkBalance)
router.put("/topup",WalletController.topupWallet)
router.put("/airtime-topup",WalletController.toupAirTime)

router.put("/transfer",WalletController.transfer)

module.exports = router;