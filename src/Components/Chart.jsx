import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import useStore from "../store";



ChartJS.register(
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

const getData = (unFormatted) => {
  let wpms = [];
  let labels = [];
  unFormatted.map((dataPoint, idx) => {
    wpms.push(dataPoint["wpm"]);
    labels.push(idx + 1);
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "WPM",
        data: wpms,
        borderColor: "#CF6BDD",
        pointBackgroundColor: "#CF6BDD",
        pointHoverRadius: 8,
        tension: 0.4,
      },
    ],
  };
};
const data = {
  labels: [1, 2, 3, 4, 5, 6, 7],
  datasets: [
    {
      label: "WPM",
      data: [100, 120, 90, 110, 150, 130, 160],
      borderColor: "#CF6BDD",
      pointBackgroundColor: "#CF6BDD",
      pointHoverRadius: 8,
      tension: 0.4,
    },
  ],
};

const options = {
responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => `WPM: ${context.raw}`,
      },
    },
    legend: {
      display: false
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#CF6BDD",
        font: {
        //   family: "Familjen Grotesk",
        },
      },
      grid: {
        color: "#1B1928",
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#CF6BDD",
        font: {
        //   family: "Familjen Grotesk",
        },
      },
      grid: {
        color: "#1B1928",
      },
      title: {
        display: true,
        text: "Words per Minute",
        color: "#CF6BDD",
        font: {
        //   family: "Familjen Grotesk",
          size: 16,
        },
      },
    },
  },
};
const MyLineChart = () => {
  const {performanceData} = useStore()
  //   const performanceData = [
  //       { wpm: 160, accuracy: 100 },
  //       { wpm: 138, accuracy: 100 },
  //       { wpm: 143, accuracy: 100 },
  //       { wpm: 123, accuracy: 100 },
  //       { wpm: 122, accuracy: 100 },
  //       { wpm: 115, accuracy: 100 },
  //       { wpm: 116, accuracy: 100 },
  //       { wpm: 105, accuracy: 100 },
  //       { wpm: 101, accuracy: 100 },
  //       { wpm: 97, accuracy: 100 },
  //       { wpm: 97, accuracy: 100 },
  //       { wpm: 94, accuracy: 100 },
  //       { wpm: 93, accuracy: 100 },
  //       { wpm: 94, accuracy: 100 },
  //       { wpm: 96, accuracy: 100 },
  //       { wpm: 98, accuracy: 100 },
  //       { wpm: 99, accuracy: 96 },
  //       { wpm: 82, accuracy: 100 },
  //       { wpm: 83, accuracy: 100 },
  //       { wpm: 84, accuracy: 100 },
  //       { wpm: 86, accuracy: 100 },
  //       { wpm: 88, accuracy: 100 },
  //       { wpm: 88, accuracy: 100 },
  // ];
  return <Line data={getData(performanceData)} options={options} />
};

export default MyLineChart;
