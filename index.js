require("dotenv").config();
const express = require('express');
const cors = require("cors"); 
const { sequelize } = require("./configs/db.configs");

const userRoutes = require('./routes/user.routes');
const walletRoutes = require('./routes/wallet.routes');
const transactionRoutes = require('./routes/transaction.routes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); // Allows Flutter to talk to the server
app.use(express.json()); // Allows reading JSON data from Flutter
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoutes);
app.use('/wallet', walletRoutes);
app.use('/transaction', transactionRoutes);

app.get("/welcome", (req, res) => {
  return res.status(200).json({ message: "Welcome to LiBirr Mobile Wallet" });
});


app.listen(PORT, async () => {
  try {
    // 1. Tell Postgres to stop enforcing constraint locks temporarily
    await sequelize.query('SET CONSTRAINTS ALL DEFERRED;');
    
    // 2. Run the sync quietly without trying to alter anything
    await sequelize.sync({ alter: false, force: false }); 
    
    console.log(`Server started on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Database sync failed:", error);
  }
});