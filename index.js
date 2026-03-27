require ("dotenv").config()
const express = require('express');
const { sequelize } = require("./configs/db.configs")
const userRoutes = require('./routes/user.routes');
const walletRoutes = require('./routes/wallet.routes');
const transactionRoutes = require('./routes/transaction.routes');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const PORT = process.env.PORT;

app.use('/user',userRoutes)
app.use('/wallet',walletRoutes)
app.use('/transaction',userRoutes)
app.use('/transaction',transactionRoutes)

app.listen(PORT, () => {
  sequelize.sync({alert: true}) 
  console.log(`Server started on http://localhost:${PORT}`);
});