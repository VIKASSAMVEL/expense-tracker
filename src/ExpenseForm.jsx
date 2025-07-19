import React, { useState, useEffect } from "react";

const ExpenseForm = ({ onAddExpense, editingExpense, isEditing, onCancelEdit }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [participants, setParticipants] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  // Populate form fields when editing
  useEffect(() => {
    if (isEditing && editingExpense) {
      setDescription(editingExpense.description || "");
      setAmount(editingExpense.amount !== undefined ? editingExpense.amount : "");
      setPaidBy(editingExpense.paidBy || "");
      setParticipants(editingExpense.participants ? editingExpense.participants.join(", ") : "");
      setCategory(editingExpense.category || "Food");
      setDate(editingExpense.date || "");
    } else {
      setDescription("");
      setAmount("");
      setPaidBy("");
      setParticipants("");
      setCategory("Food");
      setDate("");
    }
  }, [isEditing, editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !paidBy || !participants || !date) return;
    onAddExpense({
      description,
      amount: parseFloat(amount),
      paidBy,
      participants: participants.split(",").map((p) => p.trim()),
      category,
      date,
    });
    // Reset only if not editing (parent will handle reset on edit)
    if (!isEditing) {
      setDescription("");
      setAmount("");
      setPaidBy("");
      setParticipants("");
      setCategory("Food");
      setDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h2 style={{ textAlign: 'center', width: '100%' }}>{isEditing ? "Edit Expense" : "Add Expense"}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16, alignItems: 'center', width: '100%' }}>
        <div style={{ width: '100%', maxWidth: 400, minWidth: 260 }}>
          <label style={{ color: '#aaa', fontSize: '0.98em', display: 'block', marginBottom: 4, textAlign: 'center' }}>Expense name</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ width: '100%', maxWidth: 400, minWidth: 260 }}>
          <label style={{ color: '#aaa', fontSize: '0.98em', display: 'block', marginBottom: 4, textAlign: 'center' }}>Total amount</label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ width: '100%', maxWidth: 400, minWidth: 260 }}>
          <label style={{ color: '#aaa', fontSize: '0.98em', display: 'block', marginBottom: 4, textAlign: 'center' }}>Who paid?</label>
          <input
            type="text"
            placeholder="Paid by (name)"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ width: '100%', maxWidth: 400, minWidth: 260 }}>
          <label style={{ color: '#aaa', fontSize: '0.98em', display: 'block', marginBottom: 4, textAlign: 'center' }}>Names separated by commas</label>
          <input
            type="text"
            placeholder="Participants (comma separated)"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ width: '100%', maxWidth: 400, minWidth: 260 }}>
          <label style={{ color: '#aaa', fontSize: '0.98em', display: 'block', marginBottom: 4, textAlign: 'center' }}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: '100%', padding: '0.6em 1em', borderRadius: 8, background: 'rgba(36,39,56,0.85)', color: '#f4f4f4', border: '1.5px solid rgba(99,102,241,0.18)' }}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ width: '100%', maxWidth: 400, minWidth: 260 }}>
          <label style={{ color: '#aaa', fontSize: '0.98em', display: 'block', marginBottom: 4, textAlign: 'center' }}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.6em 1em',
              borderRadius: 8,
              background: 'rgba(36,39,56,0.85)',
              color: '#f4f4f4',
              border: '1.5px solid rgba(99,102,241,0.18)',
              fontFamily: 'JetBrains Mono',
              fontSize: '1em',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              transition: 'box-shadow 0.2s, background 0.2s, transform 0.2s',
              outline: 'none',
              marginBottom: 0
            }}
            onFocus={e => e.target.style.background = 'rgba(36,39,56,0.95)'}
            onBlur={e => e.target.style.background = 'rgba(36,39,56,0.85)'}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', width: '100%', maxWidth: 400, minWidth: 260 }}>
        <button
          type="submit"
          style={{
            padding: "0.8em 1.2em",
            borderRadius: 8,
            backgroundColor: isEditing ? "#2196f3" : "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "1em",
            width: '100%'
          }}
        >
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={{
              padding: "0.8em 1.2em",
              borderRadius: 8,
              backgroundColor: "#888",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "1em",
              width: '100%'
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;