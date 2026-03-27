const bcrypt = require("bcrypt");
const User = require("../models/wallet.model");
const Wallet = require("../models/wallet.model");
const { where } = require("sequelize");
class WalletController {
  static creatWallet = async (req, res, next) => {
    try {
      const { user_id } = req.body;

      const walletNumber = generateRandomTenDigitNumber();
      const newWallet = await Wallet.create({
        user_id: user_id,
        walletNumber: walletNumber,
      });

      res.json({ message: "Wallet creatd Succesfully", wallet: newWallet });
    } catch (error) {
      console.log("the error is here - ", error);
    }
  };

  static checkBalance = async (req, res, next) => {
    try {
      const { user_id } = req.body;
      const wallet = await Wallet.findOne({
        where: {
          user_id: user_id,
        },
      });
      console.log(wallet);
      res.json({
        message: "Balance Checked Succesfully",
        balance: wallet.balance,
      });
    } catch (error) {
      console.log("the error is here - ", error);
    }
  };

  static topupWallet = async (req, res, next) => {
    const { user_id, amount } = req.body;

    const wallet = await Wallet.findOne({
      where: {
        user_id: user_id,
      },
    });

    const old_balance = Number(wallet.balance);
    const new_balance = old_balance + amount;

    await wallet.update({ balance: new_balance });

    res
      .status(200)
      .json({ message: " Wallet topup succes", balance: new_balance });
  };

  //
  static toupAirTime = async (req, res, next) => {
    const { user_id, amount, phone_number } = req.body;

    const wallet = await Wallet.findOne({
      where: {
        user_id: user_id,
      },
    });

    const wallet_balance = Number(wallet.balance);

    if (amount > wallet_balance) {
      return res.status(401).json({ error: "Insufficient Balance" });
    }

    // Call the Airtime API

    const new_balance = wallet_balance - amount;

    await wallet.update({ balance: new_balance });
    res.status(200).json({
      message: `You have successfully topped up a number ${phone_number}`,
    });
  };

  
  static transfer = async (req, res, next) => {
    const { reciver_id, sender_id, amount } = req.body;
    const senderwallet = await Wallet.findOne({
      where: {
        user_id: sender_id,
      },
    });

    const reciverwallet = await Wallet.findOne({
      where: {
        user_id: reciver_id,
      },
    });

    const sender_old_balance = senderwallet.balance;

    if(sender_old_balance<amount){
      return res.status(401).json({error: "Insufficient Balance"})
    }
    const reciever_old_balance = reciverwallet.balance;

    const sender_new_balance = sender_old_balance - amount;
    const reciever_new_balance = reciever_old_balance + amount;

    await senderwallet.update({ balance: sender_new_balance });

    await reciverwallet.update({ balance: reciever_new_balance });

    res.json({ message: "You have transfered successfully" });
  };
}

function generateRandomTenDigitNumber() {
  const min = 1000000000; // Minimum 10-digit value (1 billion)
  const max = 9999999999; // Maximum 10-digit value (nearly 10 billion)
  // The formula for a random integer between min and max (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

module.exports = WalletController;
