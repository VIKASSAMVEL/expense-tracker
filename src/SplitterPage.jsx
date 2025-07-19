import React, { useState, useEffect } from "react";
import ExpenseSplitter from "./ExpenseSplitter";
import { SwitchFeatureButton } from "./LandingPage";

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
};

const responsiveStyle = `
@media (max-width: 900px) {
  .splitter-container {
    max-width: 98vw !important;
    padding: 8px !important;
    border-radius: 0 !important;
    min-height: 100vh !important;
    box-shadow: none !important;
    margin: 0 !important;
  }
}
`;

const SplitterPage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    setExpenses(saved ? JSON.parse(saved) : []);
  }, []);

  return (
    <>
      <style>{responsiveStyle}</style>
      <div className="splitter-container" style={containerStyle}>
        <SwitchFeatureButton />
        <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 32, marginBottom: 16 }}>
          Expense Splitter
        </h1>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center', width: '100%' }}>
          <div style={{ flex: 2, minWidth: 320, maxWidth: 520 }}>
            <ExpenseSplitter expenses={expenses} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SplitterPage;
