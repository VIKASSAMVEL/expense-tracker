import React from "react";

export const BudgetIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="12" rx="4" fill="#ffb300"/>
    <circle cx="12" cy="12" r="3" fill="#fff"/>
    <rect x="6" y="9" width="2" height="6" rx="1" fill="#fff"/>
    <rect x="16" y="9" width="2" height="6" rx="1" fill="#fff"/>
  </svg>
);

export const ChartIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="13" width="4" height="8" rx="2" fill="#43a047"/>
    <rect x="9" y="9" width="4" height="12" rx="2" fill="#2196f3"/>
    <rect x="15" y="5" width="4" height="16" rx="2" fill="#e53935"/>
  </svg>
);

export const InsightIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#8e24aa"/>
    <path d="M12 7v5l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
