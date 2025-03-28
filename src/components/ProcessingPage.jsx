import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";

const ProcessingPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Preparing video file...");

  useEffect(() => {
    // Function to process the video
    const processVideo = async () => {
      try {
        setStatus("Preparing to upload test video...");

        // Instead of fetching the video, let's use a file input approach
        // This is a simulation - in a real app, you'd get this from a file input
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "video/mp4,video/quicktime,video/x-msvideo";

        // Create a promise that resolves when a file is selected
        const filePromise = new Promise((resolve) => {
          fileInput.onchange = (e) => {
            if (e.target.files.length > 0) {
              resolve(e.target.files[0]);
            }
          };
        });

        // Trigger file selection dialog
        fileInput.click();

        // Wait for user to select a file
        setStatus("Please select your video file...");
        const videoFile = await filePromise;

        setStatus(
          `Video selected: ${videoFile.name} (${Math.round(
            videoFile.size / 1024 / 1024
          )}MB). Uploading...`
        );

        // Create FormData object
        const formData = new FormData();
        formData.append("file", videoFile);

        // Log file details for debugging
        console.log("Uploading file:", {
          name: videoFile.name,
          size: videoFile.size,
          type: videoFile.type,
        });

        // Make API call to process the video
        const response = await fetch("http://localhost:5002/api/process", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `API request failed with status ${response.status}`
          );
        }

        const result = await response.json();
        setStatus("Processing complete!");

        // Store the result data in localStorage or state management
        localStorage.setItem("processedData", JSON.stringify(result));

        // Process completed successfully, navigate to results
        navigate("/result");
      } catch (err) {
        console.error("Error processing video:", err);
        setError(err.message);
        setIsProcessing(false);
      }
    };

    // Start processing
    processVideo();

    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, [navigate]);

  return (
    <div className="processing-page">
      <h2>Generating Your Result...</h2>

      {isProcessing && (
        <div className="status-message">
          <p>{status}</p>
          <div className="progress-indicator"></div>
        </div>
      )}

      {/* Video Playing in Loop */}
      <video className="processing-video" autoPlay loop muted>
        <source src="logos/1x/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}

      <button className="google-signin" onClick={signInWithGoogle}>
        Sign Up with Google to View Report
      </button>
    </div>
  );
};

export default ProcessingPage;
