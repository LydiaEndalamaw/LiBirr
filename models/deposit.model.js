const Wallet = require("./wallet.model");

const { DataTypes } = (require = "sequelize");
const { sequelize } = (require = "../configs/db.configs");
const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const PaymentMethod = require("./payment_method.model");

const Deposit = sequelize.define(
  "deposit",
  {
    id: {
      type: DataTypes.UUID,
      defaultvalue: DataTypes.UUIDV4,
      primarykey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      reference: {
        model: User,
        key: "id",
      },
    },
    Wallet_id: {
      type: DataTypes.UUID,
      defaultvalue: DataTypes.UUIDV4,
      reference: {
        model: Wallet,
        key: "id",
      },
    },
    payment_method_id: {
      type: DataTypes.UUID,
      defaultvalue: DataTypes.UUIDV4,
      reference: {
        model: PaymentMethod,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    Currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider_reference: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("pending", "success", "failed"),
    },
    created_at: { type: DataTypes.Date, defaultvalue: DataTypes.now },
  },
  {
    timestamp: true,
    underscored: true,
    tableName: "deposits",
  },
);

module.export = Deposit;
