const { Op } = require("sequelize");
const Transfer = require("../models/transfer.model"); // Ensure this matches your transfer model file path
const User = require("../models/user.model");

class TransactionController {
  static getHistory = async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      // Query transfers where the user is EITHER the sender OR the receiver
      const transactions = await Transfer.findAll({
        where: {
          [Op.or]: [
            { sender_id: userId },
            { receiver_id: userId }
          ]
        },
        // Sort by newest first
        order: [["createdAt", "DESC"]],
        // Optional: Include user details to show who they transacted with
        include: [
          { model: User, as: "Sender", attributes: ["name", "email"] },
          { model: User, as: "Receiver", attributes: ["name", "email"] }
        ]
      });

      return res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions
      });
    } catch (error) {
      console.error("Fetch History Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = TransactionController;