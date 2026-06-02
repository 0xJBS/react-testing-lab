import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("description"); // Default sort state

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((data) => setTransactions([...transactions, data]))
      .catch((err) => console.error("Error posting transaction:", err));
  }
  
  // Update sort criteria state
  function onSort(selectedCategory) {
    setSortBy(selectedCategory);
  }

  // 1. Filter transactions by description based on search input
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Sort the filtered transactions
  const displayedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a[sortBy] && b[sortBy]) {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    return 0;
  });

  return (
    <div>
      <Search setSearch={setSearch} />
      <Sort onSort={onSort} />
      <AddTransactionForm postTransaction={postTransaction} />
      <TransactionsList transactions={displayedTransactions} />
    </div>
  );
}

export default AccountContainer;