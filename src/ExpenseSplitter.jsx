import React from "react";

function calculateSplits(expenses) {
  const balances = {};
  expenses.forEach(({ amount, paidBy, participants }) => {
    const share = amount / participants.length;
    participants.forEach((person) => {
      if (!balances[person]) balances[person] = 0;
      balances[person] -= share;
    });
    if (!balances[paidBy]) balances[paidBy] = 0;
    balances[paidBy] += amount;
  });
  return balances;
}

const ExpenseSplitter = ({ expenses }) => {
  const balances = calculateSplits(expenses);
  const people = Object.keys(balances);
  return (
    <div>
      <h2>Who Owes Whom</h2>
      {people.length === 0 ? (
        <p>No balances yet.</p>
      ) : (
        <ul>
          {people.map((person) => (
            <li key={person}>
              {person}: {balances[person] > 0 ? `should receive $${balances[person].toFixed(2)}` : `owes $${(-balances[person]).toFixed(2)}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseSplitter;
