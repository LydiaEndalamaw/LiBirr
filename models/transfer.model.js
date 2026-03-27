const { DataTypes }= require("sequelize")
const { sequelize } = require("../configs/db.configs");
const Wallet = require("../models/wallet.model")


const Transfer = sequelize.define("Transfer",{

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    from_wallet_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Wallet,
        key: "id"
      }
    },

    to_wallet_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Wallet,
        key: "id"
      }
    },

    amount: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },

    fee: {
      type: DataTypes.DECIMAL(18,2),
      defaultValue: 0
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending"
    },

    reference: {
      type: DataTypes.STRING
    }

  },{
   timestamp: true,
    underscored: true,
    tableName: "transfers", 
  })
module.exports = Transfer;