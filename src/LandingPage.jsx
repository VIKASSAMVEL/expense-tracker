import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TrackerIcon, SplitterIcon } from "./FeatureIcons";

const glassStyle = {
  background: 'rgba(255,255,255,0.18)',
  borderRadius: 24,
  boxShadow: '0 4px 32px #0002',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.3)',
};

const LandingPage = () => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
    background: 'linear-gradient(135deg, #e3f2fd 0%, #f1f8e9 100%)',
    fontFamily: 'Inter, Arial, sans-serif',
  }}>
    <div style={{ ...glassStyle, padding: '2em 3em', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, minWidth: 340 }}>
      <h1 style={{ fontSize: 44, fontWeight: 800, color: '#222', marginBottom: 8, letterSpacing: 1, border: 0 }}>Expense App</h1>
      <p style={{ color: '#666', fontSize: 20, marginBottom: 40, border: 0 }}>Track and split your group expenses easily</p>
      <div style={{ display: 'flex', gap: 32 }}>
        <Link to="/tracker" style={{
          padding: '2.2em 2.8em',
          ...glassStyle,
          background: 'linear-gradient(135deg, #2196f3 60%, #64b5f6 100%, rgba(255,255,255,0.18))',
          color: '#fff',
          textDecoration: 'none',
          fontSize: 24,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transition: 'transform 0.15s, box-shadow 0.15s',
          border: 'none',
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'}
        onMouseOut={e => e.currentTarget.style.transform = 'none'}
        >
          <TrackerIcon size={36} /> Expense Tracker
        </Link>
        <Link to="/splitter" style={{
          padding: '2.2em 2.8em',
          ...glassStyle,
          background: 'linear-gradient(135deg, #43a047 60%, #81c784 100%, rgba(255,255,255,0.18))',
          color: '#fff',
          textDecoration: 'none',
          fontSize: 24,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transition: 'transform 0.15s, box-shadow 0.15s',
          border: 'none',
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'}
        onMouseOut={e => e.currentTarget.style.transform = 'none'}
        >
          <SplitterIcon size={36} /> Expense Splitter
        </Link>
      </div>
    </div>
  </div>
);

// Button to switch between tracker and splitter
export const SwitchFeatureButton = () => {
  const location = useLocation();
  const isTracker = location.pathname === "/tracker";
  return (
    <Link
      to={isTracker ? "/splitter" : "/tracker"}
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        background: isTracker ? 'linear-gradient(135deg, #43a047 60%, #81c784 100%)' : 'linear-gradient(135deg, #2196f3 60%, #64b5f6 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 12,
        padding: '0.9em 1.8em',
        fontSize: 20,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        textDecoration: 'none',
        boxShadow: '0 4px 16px #0002',
        zIndex: 1000,
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'}
      onMouseOut={e => e.currentTarget.style.transform = 'none'}
    >
      {isTracker ? <SplitterIcon size={26} /> : <TrackerIcon size={26} />}
      {isTracker ? "Go to Splitter" : "Go to Tracker"}
    </Link>
  );
};

export default LandingPage;
