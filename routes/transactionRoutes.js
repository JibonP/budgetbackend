const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const { transactions, account } = require("../models/TransactionModel");

router.get("/", (req, res) => {
  res.json(transactions);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) {
    res.status(404).json({ message: "Transaction not found" });
  } else {
    res.json(transaction);
  }
});

router.post("/", (req, res) => {
  const { item_name, amount, date, from, category } = req.body;
  const newTransaction = {
    id: uuidv4(),
    item_name,
    amount,
    date,
    from,
    category,
  };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { item_name, amount, date, from, category } = req.body;
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) {
    res.status(404).json({ message: "Transaction not found" });
  } else {
    transaction.item_name = item_name;
    transaction.amount = amount;
    transaction.date = date;
    transaction.from = from;
    transaction.category = category;
    res.json(transaction);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) {
    res.status(404).json({ message: "Transaction not found" });
  } else {
    const deletedTransaction = transactions.splice(index, 1);
    res.json(deletedTransaction[0]);
  }
});

router.post("/account", (req, res) => {
  const { income, expenses } = req.body;
  account.income = income;
  account.expenses = expenses;
  account.remainingBalance = income - expenses;
  res.status(201).json(account);
});

module.exports = router;
