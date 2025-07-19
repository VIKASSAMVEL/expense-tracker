import React from "react";

export const TrackerIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="#2196f3"/>
    <path d="M7 17V13M12 17V9M17 17V7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SplitterIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#43a047"/>
    <path d="M12 6V18M6 12H18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
