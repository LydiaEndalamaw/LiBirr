const Wallet = require("../models/wallet.model");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const { sequelize } = require("../configs/db.configs");

class WalletController {
  // Topup Wallet
  static topupWallet = async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { user_id, amount, bank_name } = req.body;
      const numAmount = Number(amount);

      const wallet = await Wallet.findOne({ where: { user_id }, transaction: t });
      if (!wallet) {
        await t.rollback();
        return res.status(404).json({ error: "Wallet not found" });
      }

      wallet.balance = Number(wallet.balance) + numAmount;
      await wallet.save({ transaction: t });

      await Transaction.create(
        {
          wallet_id: wallet.id,
          amount: numAmount,
          currency: "ETB",
          status: "completed",
          balance: wallet.balance,
          description: `Top-up via ${bank_name || "Bank"}`,
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(200).json({ message: "Topup successful", balance: wallet.balance });
    } catch (error) {
      if (!t.finished) await t.rollback();
      console.error("Topup Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  // Airtime Topup
  static topupAirTime = async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { user_id, amount, phone_number } = req.body;
      const numAmount = Number(amount);

      const wallet = await Wallet.findOne({ where: { user_id }, transaction: t });
      if (!wallet) {
        await t.rollback();
        return res.status(404).json({ error: "Wallet not found" });
      }

      if (Number(wallet.balance) < numAmount) {
        await t.rollback();
        return res.status(400).json({ error: "Insufficient balance" });
      }

      wallet.balance = Number(wallet.balance) - numAmount;
      await wallet.save({ transaction: t });

      await Transaction.create(
        {
          wallet_id: wallet.id,
          amount: -numAmount,
          currency: "ETB",
          status: "completed",
          balance: wallet.balance,
          description: `Airtime purchase for ${phone_number}`,
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(200).json({ message: "Airtime topup successful", balance: wallet.balance });
    } catch (error) {
      if (!t.finished) await t.rollback();
      console.error("Airtime Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  // Peer to Peer Transfer
  static transfer = async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { sender_id, receiver_email, reciver_email, amount } = req.body;
      const targetEmail = receiver_email || reciver_email; // Handles both spellings
      const numAmount = Number(amount);

      const senderUser = await User.findOne({ where: { id: sender_id }, transaction: t });
      const reciverUser = await User.findOne({ where: { email: targetEmail }, transaction: t });

      if (!senderUser || !reciverUser) {
        await t.rollback();
        return res.status(404).json({ error: "Sender or Receiver not found" });
      }

      const senderWallet = await Wallet.findOne({ where: { user_id: senderUser.id }, transaction: t });
      const reciverWallet = await Wallet.findOne({ where: { user_id: reciverUser.id }, transaction: t });

      if (Number(senderWallet.balance) < numAmount) {
        await t.rollback();
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Sender Deduction
      senderWallet.balance = Number(senderWallet.balance) - numAmount;
      await senderWallet.save({ transaction: t });

      await Transaction.create(
        {
          wallet_id: senderWallet.id,
          amount: -numAmount,
          currency: "ETB",
          status: "completed",
          balance: senderWallet.balance,
          description: `Transfer to ${targetEmail}`,
        },
        { transaction: t }
      );

      // Receiver Addition
      reciverWallet.balance = Number(reciverWallet.balance) + numAmount;
      await reciverWallet.save({ transaction: t });

      await Transaction.create(
        {
          wallet_id: reciverWallet.id,
          amount: numAmount,
          currency: "ETB",
          status: "completed",
          balance: reciverWallet.balance,
          description: `Received from ${senderUser.email || "User"}`,
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(200).json({ message: "Transfer successful", balance: senderWallet.balance });
    } catch (error) {
      if (!t.finished) await t.rollback();
      console.error("Transfer Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  // Get Wallet Balance
  static getBalance = async (req, res) => {
    try {
      const user_id = req.params.userId || req.params.user_id;
      const wallet = await Wallet.findOne({ where: { user_id } });
      
      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" });
      }
      
      return res.status(200).json({ balance: wallet.balance });
    } catch (error) {
      console.error("Get Balance Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  // Get Transaction History
  static getHistory = async (req, res) => {
    try {
      const user_id = req.params.user_id || req.params.userId;
      console.log("--> GET HISTORY REQUEST FOR USER_ID:", user_id);

      const wallet = await Wallet.findOne({ where: { user_id } });
      
      if (!wallet) {
        console.log("--> NO WALLET FOUND FOR USER_ID:", user_id);
        return res.status(404).json({ error: "Wallet not found" });
      }

      console.log("--> WALLET FOUND:", wallet.id, "BALANCE:", wallet.balance);

      const history = await Transaction.findAll({
        where: { wallet_id: wallet.id },
        order: [["created_at", "DESC"]],
      });

      console.log("--> TRANSACTIONS COUNT FOUND:", history.length);

      return res.status(200).json({ data: history });
    } catch (error) {
      console.error("History Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  // Alias for backward compatibility
  static getTransactionHistory = async (req, res) => {
    return WalletController.getHistory(req, res);
  };
}

module.exports = WalletController;