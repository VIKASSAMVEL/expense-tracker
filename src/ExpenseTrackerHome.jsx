import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSplitter from "./ExpenseSplitter";

const getInsights = (expenses) => {
  if (expenses.length === 0) return null;
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const people = Array.from(new Set(expenses.flatMap(e => e.participants.concat(e.paidBy))));
  const perPerson = (total / people.length) || 0;
  return { total, peopleCount: people.length, perPerson };
};

const ExpenseTrackerHome = () => {
  const [expenses, setExpenses] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [lightMode, setLightMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleAddExpense = (expense) => {
    if (editingIndex !== null) {
      // Update existing expense
      const updated = [...expenses];
      updated[editingIndex] = expense;
      setExpenses(updated);
      setEditingIndex(null);
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, expense]);
    }
  };

  const handleEditExpense = (idx) => {
    setEditingIndex(idx);
    setEditingExpense(expenses[idx]);
  };

  const handleDeleteExpense = (idx) => {
    const updated = expenses.filter((_, i) => i !== idx);
    setExpenses(updated);
    // If deleting the one being edited, cancel edit
    if (editingIndex === idx) {
      setEditingIndex(null);
      setEditingExpense(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingExpense(null);
  };

  const handleReset = () => {
    setExpenses([]);
    setEditingIndex(null);
    setEditingExpense(null);
  };
  const insights = getInsights(expenses);

  React.useEffect(() => {
    document.body.classList.toggle('light-mode', lightMode);
  }, [lightMode]);

  // Persist expenses to localStorage
  React.useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // CSV download
  const handleDownloadCSV = () => {
    if (!expenses.length) return;
    const header = ['Description', 'Amount', 'Paid By', 'Participants', 'Category', 'Date'];
    const rows = expenses.map(e => [
      '"' + e.description.replace(/"/g, '""') + '"',
      e.amount,
      '"' + e.paidBy.replace(/"/g, '""') + '"',
      '"' + (e.participants ? e.participants.join('; ') : '') + '"',
      '"' + e.category.replace(/"/g, '""') + '"',
      '"' + e.date + '"'
    ]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass" style={{
      minHeight: '100vh',
      width: '100%',
      maxWidth: 600,
      margin: '0 auto',
      padding: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      alignItems: 'center',
      overflowX: 'hidden'
    }}>
      <div style={{ flex: 1, width: '100%', maxWidth: 600, margin: 0, padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'stretch', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 600, margin: '0', padding: 32, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'stretch', boxSizing: 'border-box', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h1 style={{
              fontFamily: 'Montserrat, JetBrains Mono, Inter, Segoe UI, Arial, sans-serif',
              fontWeight: 800,
              letterSpacing: '0.04em',
              fontSize: '2.7rem',
              color: '#fff',
              textShadow: '0 2px 16px rgba(99,102,241,0.12)',
              margin: 0
            }}>Expense Tracker & Splitter</h1>
            <button
              onClick={() => setLightMode((m) => !m)}
              style={{ fontSize: 18, padding: '0.4em 1em', borderRadius: 8, background: lightMode ? '#6366f1' : '#f59e42', color: '#fff', border: 'none', marginLeft: 12 }}
            >
              {lightMode ? '🌞 Light' : '🌙 Dark'}
            </button>
          </div>
          <p>Welcome! Use the navigation to add expenses and split them among friends.</p>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'stretch', width: '100%' }}>
            <ExpenseForm
              onAddExpense={handleAddExpense}
              editingExpense={editingExpense}
              isEditing={editingIndex !== null}
              onCancelEdit={handleCancelEdit}
            />
            <ExpenseList
              expenses={expenses}
              onEditExpense={handleEditExpense}
              onDeleteExpense={handleDeleteExpense}
            />
            <ExpenseSplitter expenses={expenses} />
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button className="reset-btn" onClick={handleReset}>Reset All</button>
              <button onClick={handleDownloadCSV} style={{ background: 'linear-gradient(90deg, #06b6d4 60%, #6366f1 100%)', color: '#fff', fontWeight: 600, borderRadius: 8, padding: '0.7em 1.2em', border: 'none', cursor: 'pointer' }}>Download CSV</button>
            </div>
            {insights && (
              <div className="insights">
                <h3>Insights</h3>
                <p><strong>Total Spent:</strong> ${insights.total.toFixed(2)}</p>
                <p><strong>People Involved:</strong> {insights.peopleCount}</p>
                <p><strong>Avg. Per Person:</strong> ${insights.perPerson.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTrackerHome;
