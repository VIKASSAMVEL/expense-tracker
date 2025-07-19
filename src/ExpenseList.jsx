import React from "react";
import { getAvatarColor, getInitials } from "./avatarUtils";

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => (
  <div style={{ marginBottom: 24 }}>
    <h2>Expenses</h2>
    {expenses.length === 0 ? (
      <p>No expenses yet.</p>
    ) : (
      <ul>
        {expenses.map((exp, idx) => (
          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: getAvatarColor(exp.paidBy),
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: 16
            }}>{getInitials(exp.paidBy)}</span>
            <div style={{ flex: 1 }}>
              <strong>{exp.description}</strong> — ${exp.amount.toFixed(2)}
              <br />
              <span style={{ fontSize: '0.95em', color: '#aaa' }}>
                {exp.category} | {exp.date} | paid by <b>{exp.paidBy}</b> (split among: {exp.participants.join(", ")})
              </span>
            </div>
            <button
              style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4em 0.8em', marginRight: 6, cursor: 'pointer' }}
              onClick={() => onEditExpense(idx)}
            >Edit</button>
            <button
              style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4em 0.8em', cursor: 'pointer' }}
              onClick={() => onDeleteExpense(idx)}
            >Delete</button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ExpenseList;
