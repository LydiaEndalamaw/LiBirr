const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const sequelize = require("../configs/db.configs");
const User = require("./user.model");

const PaymentMethod = sequelize.define("Paymentmethod", {
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

  type: {
    type: DataTypes.ENUM("card", "bank_account", "crypto"),
    allowNull: false,
  },

  provider: {
    type: DataTypes.STRING,
  },

  account_number: {
    type: DataTypes.STRING,
  },

  expiry_month: {
    type: DataTypes.STRING,
  },
  expiry_year: {
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
  token: {
    type: DataTypes.STRING,
  },
  is_default: {
    type: DataTypes.BOOLEAN,
  },
  last4: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },  
},{
 timestamp: true,
    underscored: true,
    tableName: "payment_methods", 
}

);
module.exports = PaymentMethod;
