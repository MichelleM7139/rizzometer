import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from '../firebase'; 

const ProcessingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing delay before navigating to results
    const timer = setTimeout(() => {
      navigate('/result');
    }, 10000); // 10 seconds delay
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="processing-page">
      <h2>Generating Your Result...</h2>

      {/* Video Playing in Loop */}
      <video className="processing-video" autoPlay loop muted>
        <source src="logos/1x/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button className="google-signin" onClick={signInWithGoogle}>
        Sign Up with Google to View Report
      </button>
    </div>
  );
};

export default ProcessingPage;
