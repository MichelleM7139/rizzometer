import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Tone', 'Engagement', 'Humor', 'Confidence'],
  datasets: [
    {
      label: 'Good Conversation',
      data: [85, 90, 70, 80],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Bad Conversation',
      data: [30, 20, 10, 25],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Conversation Analysis',
    },
  },
};

const AnalysisGraph = () => {
  return <Bar data={data} options={options} />;
};

export default AnalysisGraph;