import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree, extend, useFrame } from "@react-three/fiber";
import { Bar, Radar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import TextPressure from "./Temp";
import FuzzyText from "./FuzzyText";
import { Suspense } from "react";
import HeartModel from "./heart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement
);

const UploadPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap";
    link.rel = "stylesheet";
    link.onload = () => console.log("Font loaded successfully");
    link.onerror = () => console.error("Failed to load font");
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [video, setVideo] = useState(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("Video file selected:", file.name);
      setVideo(URL.createObjectURL(file));

      // Ensure the file is valid before navigating
      setTimeout(() => {
        console.log("Navigating to processing page...");
        navigate("/processing");
      }, 1000);
    } else {
      console.error("No file selected.");
    }
  };

  // Data for the main bar charts
  const goodExampleData = {
    labels: ["Tone", "Engagement", "Humor", "Confidence"],
    datasets: [
      {
        label: "Score",
        data: [90, 95, 85, 90], // Good example scores
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Black bars
        borderColor: "rgba(0, 0, 0, 1)", // Black border
        borderWidth: 1,
      },
    ],
  };

  const badExampleData = {
    labels: ["Tone", "Engagement", "Humor", "Confidence"],
    datasets: [
      {
        label: "Score",
        data: [50, 60, 40, 55], // Bad example scores
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Black bars
        borderColor: "rgba(0, 0, 0, 1)", // Black border
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar charts
  const chartOptions = {
    indexAxis: "y", // Horizontal bars
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 100, // Set x-axis range to 0–100
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
          color: "#000", // Black text
        },
      },
      y: {
        grid: {
          display: false, // Hide y-axis grid lines
        },
        ticks: {
          color: "#000", // Black text
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: "Rizz Score", // Title above the graph
        font: {
          size: 16,
          weight: "bold",
        },
        color: "#000", // Black text
      },
    },
  };

  // Data for the radar chart (Emotion Analysis)
  const emotionData = {
    labels: ["Confidence", "Humor", "Engagement", "Tone", "Clarity"],
    datasets: [
      {
        label: "Good Example",
        data: [90, 85, 95, 90, 80],
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Bad Example",
        data: [50, 40, 60, 55, 45],
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(0, 0, 0, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the line chart (Improvement Over Time)
  const improvementData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Rizz Score",
        data: [60, 70, 80, 90],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className="upload-page">
      <header className="head">
        <img src="logos/1x/search.png" alt="Search Logo" className="search" />
        <h1 className="title">TEST YOUR </h1>
        <FuzzyText>RIZZ</FuzzyText>
        <h1 className="title">SCORE</h1>
      </header>

      <HeartModel />

      <div className="upload-section">
        <h2>Upload Your Conversation Video</h2>
        <label className="custom-upload-button">
          UPLOAD
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
        </label>
      </div>

      <div className="content">
        <div className="examples-section">
          <TextPressure
            text="Examples"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="000000"
            strokeColor="#000000"
            minFontSize={50}
            fontFamily="Uncial Antiqua"
          />
        </div>

        <div className="examples-container">
          <div className="example-card">
            <div className="card-content">
              <img
                src="logos/1x/good.webp"
                alt="Good Example"
                className="example-image"
              />
              <div className="chart-container">
                <Bar data={goodExampleData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="example-card">
            <div className="card-content">
              <img
                src="logos/1x/bad.webp"
                alt="Bad Example"
                className="example-image"
              />
              <div className="chart-container">
                <Bar data={badExampleData} options={chartOptions} />
              </div>
            </div>
          </div>
          <div className="additional-charts">
            <div className="chart-card">
              <h3>Emotion Analysis</h3>
              <Radar data={emotionData} />
            </div>
            <div className="chart-card">
              <h3>Improvement Over Time</h3>
              <Line data={improvementData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
