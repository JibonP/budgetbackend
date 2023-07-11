const { v4: uuidv4 } = require("uuid");

const transactions = [
  {
    id: uuidv4(),
    item_name: "Income",
    amount: 1000,
    date: "2023-01-01",
    from: "Employer",
    category: "Income",
  },
  {
    id: uuidv4(),
    item_name: "Groceries",
    amount: -50,
    date: "2023-01-05",
    from: "Grocery Store",
    category: "Expenses",
  },
];

let account = {
  income: 0,
  expenses: 0,
};

module.exports = {
  transactions,
  account,
};
