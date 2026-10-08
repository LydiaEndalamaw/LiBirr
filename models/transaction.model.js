const { DataTypes } = require("sequelize");
// Destructure sequelize if exported as { sequelize } from db.configs
const { sequelize } = require("../configs/db.configs"); 
const Wallet = require("./wallet.model");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    },
    amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0.0,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ETB",
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "completed",
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    balance: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "transactions",
  }
);

module.exports = Transaction;