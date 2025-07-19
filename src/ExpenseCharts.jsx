import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export function CategoryPieChart({ expenses }) {
  // Aggregate by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#2196f3', '#43a047', '#ffb300', '#e53935', '#8e24aa', '#00bcd4', '#fbc02d', '#6d4c41', '#c62828', '#3949ab'
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ maxWidth: 340, margin: '0 auto' }}>
      <Pie data={data} options={{ plugins: { legend: { position: 'bottom' } } }} />
    </div>
  );
}

export function PersonBarChart({ expenses }) {
  // Aggregate by person
  const personTotals = expenses.reduce((acc, exp) => {
    acc[exp.paidBy] = (acc[exp.paidBy] || 0) + exp.amount;
    return acc;
  }, {});
  const data = {
    labels: Object.keys(personTotals),
    datasets: [
      {
        label: 'Total Spent',
        data: Object.values(personTotals),
        backgroundColor: '#2196f3',
      },
    ],
  };
  return (
    <div style={{ maxWidth: 340, margin: '0 auto' }}>
      <Bar data={data} options={{
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      }} />
    </div>
  );
}
