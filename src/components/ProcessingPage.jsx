// src/components/ProcessingPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from '../firebase'; // Updated import path

const ProcessingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing delay
    const timer = setTimeout(() => {
      navigate('/result');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="processing-page">
      <h2>Processing Your Video...</h2>
      <div className="spinner"></div>
      <button onClick={signInWithGoogle}>Sign Up with Google</button>
    </div>
  );
};

export default ProcessingPage;