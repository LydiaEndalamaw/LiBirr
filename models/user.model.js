const { DataTypes }= require("sequelize")
const { sequelize } = require("../configs/db.configs");

const User = sequelize.define("User",{

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    timestamp: true,
    underscored: true,
    tableName: "users",
})

module.exports = User;