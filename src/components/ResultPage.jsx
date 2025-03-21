// // ResultPage.jsx
// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
// src/components/ResultPage.jsx
const ResultPage = () => {
    return (
      <div className="result-page">
        <h1>Result Page</h1>
        <p>Here are the results of your conversation analysis.</p>
      </div>
    );
  };
  
  export default ResultPage;
// const ResultPage = () => {
//   const [analysisData, setAnalysisData] = useState(null);

//   useEffect(() => {
//     axios.get('/api/analysis-results')
//       .then(response => setAnalysisData(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   const data = {
//     labels: ['Tone', 'Confidence', 'Humor', 'Engagement'],
//     datasets: [
//       {
//         label: 'Conversation Analysis',
//         data: analysisData || [0, 0, 0, 0],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="result-page">
//       <h2>Your Rizz Rating</h2>
//       <div className="chart">
//         <Bar data={data} />
//       </div>
//     </div>
//   );
// };

// export default ResultPage;