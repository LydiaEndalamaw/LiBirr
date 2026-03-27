const { DataTypes, DATE } = require("sequelize");
const { sequelize } = require("../configs/db.configs");
const User = require("../models/user.model");

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ETB"
    },
    locked_balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
    },

    walletNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
      
    },
    status: {
      type: DataTypes.ENUM("active", "frozen"),
      defaultValue: "active",
    },

    wallet_type: {
      type: DataTypes.ENUM("regular", "merchant","agent"),
      defaultValue: "regular",
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamp: true,
    underscored: true,
    tableName: "wallets",
  },
);

module.exports = Wallet;
