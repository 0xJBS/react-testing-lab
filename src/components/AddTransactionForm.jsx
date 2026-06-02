import React, { useState } from "react";

function AddTransactionForm({ postTransaction }) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  function submitForm(e) {
    e.preventDefault();
    
    const newTransaction = {
      date: date,
      description: description,
      category: category,
      amount: parseFloat(amount) || 0
    };

    postTransaction(newTransaction);

    // Reset inputs cleanly after submission
    setDate("");
    setDescription("");
    setCategory("");
    setAmount("");
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={submitForm}>
        <div className="inline fields">
          <input 
            type="date" 
            name="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
          <input 
            type="text" 
            name="description" 
            placeholder="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input 
            type="text" 
            name="category" 
            placeholder="Category" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input 
            type="number" 
            name="amount" 
            placeholder="Amount" 
            step="0.01" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;