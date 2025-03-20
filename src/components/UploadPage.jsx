// UploadPage.jsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bar, Radar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import TextPressure from './Temp'; 
import { useEffect } from 'react';
import FuzzyText from './FuzzyText';
import { OrbitControls, useGLTF,useHelper } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { Suspense } from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('3D Error:', error, info); }
  render() { return this.state.hasError ? <div>3D Viewer Unavailable</div> : this.props.children; }
}


function ControlledOrbit() {
  const controls = useRef();
  return (
    <OrbitControls
      ref={controls}
      enableZoom={true}
      enablePan={true}
      rotateSpeed={0.5}
      maxDistance={10}
      minDistance={1}
    />
  );
}
function Model() {
  const group = useRef();
  const { scene } = useGLTF('logos/1x/cartoon.glb');
  
  // Center and scale the model
  scene.position.set(0, 0, 0);
  scene.scale.set(1.2, 1.2, 1.2);

  // Optional: Compute bounding box to center the model
  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());
  scene.position.sub(center);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

function Scene() {
// Modified lighting setup
const directionalLight = useRef();
  
// Optional: Add light helper
useHelper(directionalLight, THREE.DirectionalLightHelper, 1, 'white');

return (
  <>
    <ambientLight intensity={1.5} color="#ffffff" />
    <directionalLight
      ref={directionalLight}
      position={[5, 5, 5]}
      intensity={3.0}
      castShadow
      shadow-mapSize={[4096, 4096]}
    />
    <hemisphereLight
      groundColor="#b0b0b0"
      skyColor="#ffffff"
      intensity={1.0}
    />
    <pointLight
      position={[-5, 3, -5]}
      intensity={1.5}
      color="#ffffff"
    />
    <Model />
    <ControlledOrbit />
  </>
);
}


function HeartCharacter() {
  return (
    <div className="cartoon-section">
      <Canvas
        camera={{ 
          position: [0, 0.5, 4],  // Adjusted camera position
          fov: 55,
          near: 0.1,
          far: 1000 
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <Suspense fallback={<div className="loading-3d">Loading Character...</div>}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
// Register ChartJS components
ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  RadialLinearScale, PointElement, LineElement
);

const UploadPage = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap';
    link.rel = 'stylesheet';
    link.onload = () => console.log('Font loaded successfully');
    link.onerror = () => console.error('Failed to load font');
    document.head.appendChild(link);
  
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [video, setVideo] = useState(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideo(URL.createObjectURL(file));
  };

  // Data for the main bar charts
  const goodExampleData = {
    labels: ['Tone', 'Engagement', 'Humor', 'Confidence'],
    datasets: [
      {
        label: 'Score',
        data: [90, 95, 85, 90], // Good example scores
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black bars
        borderColor: 'rgba(0, 0, 0, 1)', // Black border
        borderWidth: 1,
      },
    ],
  };

  const badExampleData = {
    labels: ['Tone', 'Engagement', 'Humor', 'Confidence'],
    datasets: [
      {
        label: 'Score',
        data: [50, 60, 40, 55], // Bad example scores
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black bars
        borderColor: 'rgba(0, 0, 0, 1)', // Black border
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar charts
  const chartOptions = {
    indexAxis: 'y', // Horizontal bars
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 100, // Set x-axis range to 0–100
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
          color: '#000', // Black text
        },
      },
      y: {
        grid: {
          display: false, // Hide y-axis grid lines
        },
        ticks: {
          color: '#000', // Black text
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: 'Rizz Score', // Title above the graph
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#000', // Black text
      },
    },
  };

  // Data for the radar chart (Emotion Analysis)
  const emotionData = {
    labels: ['Confidence', 'Humor', 'Engagement', 'Tone', 'Clarity'],
    datasets: [
      {
        label: 'Good Example',
        data: [90, 85, 95, 90, 80],
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'Bad Example',
        data: [50, 40, 60, 55, 45],
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  // Data for the line chart (Improvement Over Time)
  const improvementData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Rizz Score',
        data: [60, 70, 80, 90],
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className="upload-page">
      <header className="head">
        <img src="logos/1x/search.png" alt="Search Logo" className='search' />
        <h1 className="title">TEST YOUR </h1>
        <FuzzyText>
          RIZZ
        </FuzzyText>
        <h1 className="title">SCORE</h1>
        
      </header>

      <ErrorBoundary>
        <div className="cartoon-section">
          <Canvas
            camera={{ 
              position: [0, 0, 3], 
              fov: 45,
              near: 0.1,
              far: 1000 
            }}
            gl={{
              antialias: true,
              powerPreference: "high-performance"
            }}
            onCreated={({ gl }) => {
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
          >
            <Suspense fallback={<div className="loading-3d">Loading Character...</div>}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
      </ErrorBoundary>
      
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
              <img src="logos/1x/good.webp" alt="Good Example" className="example-image" />
              <div className="chart-container">
                <Bar data={goodExampleData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="example-card">
            <div className="card-content">
              <img src="logos/1x/bad.webp" alt="Bad Example" className="example-image" />
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

        

        

        <div className="3d-section">
          <Canvas>
            {/* Add 3D interactive elements here */}
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;