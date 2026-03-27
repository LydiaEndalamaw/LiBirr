const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db.configs");
const Wallet = require("../models/wallet.model");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
    },
    wallet_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Wallet,
        key: "id",
      },

      amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
      },
      fee: {
        type: DataTypes.DECIMAL(18, 2),
        defaultValue: 0,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        defaultValue: "pending",
      },
      reference: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },

      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
      },
    },
  },
  {
    timestamp: true,
    underscored: true,
    tableName: "transactions",
  },
);

module.exports = Transaction;
