const { DataTypes, Date, UUIDV4 } = require("sequelize");
const { Sequelize, sequelize } = require("../configs/db.configs");
const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const PaymentMethod = require("./payment_method.model");

const Withdrawal = sequelize.define(
  "Withdrawal", {
  id: {
    type: DataTypes.UUID,
    defaultvalue: UUIDV4,
  },
  wallet_id: {
    type: DataTypes.UUID,
    reference: {
      model: Wallet,
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.UUID,
    reference: {
      model: User,
      key: "id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultvalue: 0.0,
  },
  fee: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  desitination: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected", "completed"),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultvalue: DataTypes.NOW,
  },
},{
   timestamp: true,
    underscored: true,
    tableName: "withdrawals", 
});
module.exports = Withdrawal;
