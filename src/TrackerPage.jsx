import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { SwitchFeatureButton } from "./LandingPage";
import { CategoryPieChart, PersonBarChart } from "./ExpenseCharts";
import { BudgetIcon, ChartIcon, InsightIcon } from "./SectionIcons";

// Responsive styles
const containerStyle = {
  maxWidth: 900,
  margin: '40px auto',
  padding: 32,
  position: 'relative',
  background: 'rgba(255,255,255,0.18)',
  borderRadius: 24,
  boxShadow: '0 4px 32px #0002',
  minHeight: '80vh',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.3)',
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  backgroundImage: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
};

const responsiveStyle = `
@media (max-width: 900px) {
  .expense-container {
    max-width: 98vw !important;
    padding: 8px !important;
    border-radius: 0 !important;
    min-height: 100vh !important;
    box-shadow: none !important;
    margin: 0 !important;
  }
  .expense-empty-illustration {
    padding: 24px !important;
    margin: 24px 0 !important;
  }
  .expense-form {
    padding: 0 !important;
  }
}
`;

const getInsights = (expenses) => {
  if (expenses.length === 0) return null;
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const people = Array.from(new Set(expenses.flatMap(e => e.participants.concat(e.paidBy))));
  const perPerson = (total / people.length) || 0;
  return { total, peopleCount: people.length, perPerson };
};

const TrackerPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget');
    return saved ? parseFloat(saved) : 0;
  });

  useEffect(() => {
    const loadExpenses = () => {
      const saved = localStorage.getItem('expenses');
      setExpenses(saved ? JSON.parse(saved) : []);
    };
    loadExpenses();
    // Listen for localStorage changes from other tabs/pages
    const handleStorage = (e) => {
      if (e.key === 'expenses') {
        loadExpenses();
      }
    };
    // Also reload when page becomes visible again (e.g., after navigating back)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadExpenses();
      }
    };
    window.addEventListener('storage', handleStorage);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', loadExpenses);
    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', loadExpenses);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budget', budget);
  }, [budget]);

  const handleAddExpense = (expense) => {
    if (editingIndex !== null) {
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
    setEditingIndex(null);
    setEditingExpense(null);
  };

  const insights = getInsights(expenses);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetRemaining = budget - totalSpent;
  const budgetUsedPercent = budget > 0 ? Math.min(100, (totalSpent / budget) * 100) : 0;

  return (
    <>
      <style>{`
        ${responsiveStyle}
        input, button, [tabindex]:not([tabindex='-1']) {
          outline: none;
        }
        input:focus, button:focus, [tabindex]:focus {
          outline: 2px solid #2196f3 !important;
          outline-offset: 2px;
          box-shadow: 0 0 0 2px #bbdefb80;
        }
      `}</style>
      <div className="expense-container" style={containerStyle}>
        <SwitchFeatureButton aria-label="Switch to Splitter or Tracker" tabIndex={0} />
        <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 32, marginBottom: 16, color: '#111', fontWeight: 800, letterSpacing: 0.5, textShadow: '0 1px 4px #fff8' }} tabIndex={0} aria-label="Expense Tracker main heading">
          Expense Tracker
        </h1>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ flex: 2, minWidth: 320, maxWidth: 520 }}>
            {expenses.length === 0 ? (
              <div className="expense-empty-illustration" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: '#f8fafc', borderRadius: 16, padding: 40, margin: '40px 0', boxShadow: '0 2px 12px #0001'
              }} tabIndex={0} aria-label="No expenses illustration. Start by adding your first expense below!">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <ellipse cx="60" cy="100" rx="40" ry="10" fill="#e3f2fd"/>
                  <rect x="30" y="30" width="60" height="40" rx="12" fill="#bbdefb"/>
                  <rect x="45" y="45" width="30" height="10" rx="5" fill="#fff"/>
                  <circle cx="60" cy="50" r="4" fill="#2196f3"/>
                </svg>
                <h2 style={{ color: '#2196f3', marginTop: 24, marginBottom: 8, fontSize: 22, fontWeight: 700, letterSpacing: 0.2, textShadow: '0 1px 4px #fff8' }} tabIndex={0}>No expenses yet</h2>
                <p style={{ color: '#111', fontSize: 18, marginBottom: 0, textAlign: 'center', fontWeight: 500, letterSpacing: 0.1 }} tabIndex={0}>Start by adding your first expense below!</p>
              </div>
            ) : (
              <ExpenseList
                expenses={expenses}
                onEditExpense={handleEditExpense}
                onDeleteExpense={handleDeleteExpense}
                keyboardAccessible={true}
              />
            )}
            <div className="expense-form">
              <ExpenseForm
                onAddExpense={handleAddExpense}
                editingExpense={editingExpense}
                isEditing={editingIndex !== null}
                onCancelEdit={() => { setEditingIndex(null); setEditingExpense(null); }}
                keyboardAccessible={true}
              />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 260, maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: 'linear-gradient(135deg, #ffe082 60%, #ffd54f 100%)', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px #ffb30040', marginBottom: 16, color: '#111', fontWeight: 700 }}>
              <h3 style={{ color: '#111', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, letterSpacing: 0.2, textShadow: '0 1px 4px #fff8' }} tabIndex={0}><BudgetIcon /> Budget</h3>
              <label style={{ fontWeight: 600, color: '#111', display: 'block', marginBottom: 8, fontSize: 16, letterSpacing: 0.1 }} htmlFor="budget-input">
                <span style={{ marginRight: 8, color: '#111', fontWeight: 600 }}>Set Budget:</span>
                <input
                  id="budget-input"
                  type="number"
                  min="0"
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  style={{
                    padding: '0.4em 1em',
                    borderRadius: 8,
                    border: '1px solid #bbb',
                    fontSize: 18,
                    width: 120,
                    background: 'rgba(255,255,255,0.5)',
                    outline: 'none',
                    color: '#111',
                    fontWeight: 600,
                  }}
                  placeholder="Set budget"
                  aria-label="Set budget"
                />
              </label>
              <div style={{ fontSize: 16, color: budgetRemaining < 0 ? '#e53935' : '#111', fontWeight: 700, letterSpacing: 0.1 }} tabIndex={0} aria-live="polite">
                Remaining: <span style={{ color: budgetRemaining < 0 ? '#e53935' : '#111', fontWeight: 800 }}>${budgetRemaining.toFixed(2)}</span> {budget > 0 && <span style={{ color: '#111', fontWeight: 600 }}>(Used: {budgetUsedPercent.toFixed(1)}%)</span>}
              </div>
              {budget > 0 && (
                <div style={{
                  width: '100%',
                  background: '#e3f2fd',
                  borderRadius: 8,
                  height: 14,
                  marginTop: 4,
                  overflow: 'hidden',
                  boxShadow: '0 1px 4px #0001',
                }} aria-label="Budget usage progress bar" tabIndex={0}>
                  <div style={{
                    width: `${budgetUsedPercent}%`,
                    height: '100%',
                    background: budgetUsedPercent > 100 ? '#e53935' : '#2196f3',
                    transition: 'width 0.3s',
                  }} />
                </div>
              )}
            </div>
            <div style={{ background: 'linear-gradient(135deg, #e3f2fd 60%, #bbdefb 100%)', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px #2196f340', color: '#111', fontWeight: 700 }}>
              <h3 style={{ textAlign: 'center', color: '#111', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', fontWeight: 800, letterSpacing: 0.2, textShadow: '0 1px 4px #fff8' }} tabIndex={0}><ChartIcon /> By Category</h3>
              <CategoryPieChart expenses={expenses} />
            </div>
            <div style={{ background: 'linear-gradient(135deg, #e8f5e9 60%, #b9f6ca 100%)', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px #43a04740', color: '#111', fontWeight: 700 }}>
              <h3 style={{ textAlign: 'center', color: '#111', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', fontWeight: 800, letterSpacing: 0.2, textShadow: '0 1px 4px #fff8' }} tabIndex={0}><ChartIcon /> By Person</h3>
              <PersonBarChart expenses={expenses} />
            </div>
            {insights && (
              <div style={{ marginTop: 24, background: 'linear-gradient(135deg, #f3e5f5 60%, #ce93d8 100%)', padding: 16, borderRadius: 8, color: '#111', boxShadow: '0 2px 8px #8e24aa30', fontWeight: 700 }}>
                <h3 style={{ color: '#111', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, letterSpacing: 0.2, textShadow: '0 1px 4px #fff8' }} tabIndex={0}><InsightIcon /> Insights</h3>
                <p style={{ color: '#111', fontWeight: 600, fontSize: 16, letterSpacing: 0.1 }} tabIndex={0}>Total Spent: <b style={{ color: '#111', fontWeight: 800 }}>${insights.total.toFixed(2)}</b></p>
                <p style={{ color: '#111', fontWeight: 600, fontSize: 16, letterSpacing: 0.1 }} tabIndex={0}>People: <b style={{ color: '#111', fontWeight: 800 }}>{insights.peopleCount}</b></p>
                <p style={{ color: '#111', fontWeight: 600, fontSize: 16, letterSpacing: 0.1 }} tabIndex={0}>Avg per Person: <b style={{ color: '#111', fontWeight: 800 }}>${insights.perPerson.toFixed(2)}</b></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackerPage;
