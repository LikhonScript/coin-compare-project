import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const Graph = ({ graphValue }) => {
  let randomPoints = [
    [65, 59, 100, 80, 10, 56, 72, 45, 67, 55, 42],
    [10, 50, 30, 84, 38, 90, 42, 77, 100, 0, 100],
    [0, 59, 100, 80, 10, 56, 100, 0, 26, 23, 32],
    [100, 42, 77, 100, 0, 100, 72, 45, 67, 55, 42],
    [0, 100, 47, 19, 90, 34, 25, 65, 78, 0, 32],
  ];

  let getRandomPoints = () => {
    let rndInt = Math.floor(Math.random() * 4) + 1;

    return randomPoints[rndInt];
  };

  let data = {
    labels: [
      "6:04 PM",
      "9:04 PM",
      "3:04 PM",
      "6:04 PM",
      "9:04 AM",
      "12:04 PM",
      "3: 04 PM",
    ],
    datasets: [
      {
        fill: true,
        lineTension: 0.1,
        backgroundColor: "#8e24aa11",
        borderColor: "#8e24aa",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#8e24aa",
        pointBackgroundColor: "#8e24aa",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#8e24aa",
        pointHoverBorderColor: "#8e24aa",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: getRandomPoints(),
      },
    ],
  };
  if (graphValue == 7) {
    randomPoints = [
      [65, 59, 100, 80, 10, 56, 72, 45, 67, 55, 42],
      [10, 50, 30, 84, 38, 90, 42, 77, 100, 0, 100],
      [0, 59, 100, 80, 10, 56, 100, 0, 26, 23, 32],
      [100, 42, 77, 100, 0, 100, 72, 45, 67, 55, 42],
      [0, 100, 47, 19, 90, 34, 25, 65, 78, 0, 32],
    ];

    data = {
      labels: [
        "8 May",
        "9 May",
        "10 May",
        "11 May",
        "12 May",
        "13 May",
        "14 May",
      ],
      datasets: [
        {
          fill: true,
          lineTension: 0.1,
          backgroundColor: "#8e24aa11",
          borderColor: "#8e24aa",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#8e24aa",
          pointBackgroundColor: "#8e24aa",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#8e24aa",
          pointHoverBorderColor: "#8e24aa",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: getRandomPoints(),
        },
      ],
    };
  } else if (graphValue == 14) {
    randomPoints = [
      [65, 59, 100, 80, 10, 56, 72, 45, 67, 55, 42],
      [10, 50, 30, 84, 38, 90, 42, 77, 100, 0, 100],
      [0, 59, 100, 80, 10, 56, 100, 0, 26, 23, 32],
      [100, 42, 77, 100, 0, 100, 72, 45, 67, 55, 42],
      [0, 100, 47, 19, 90, 34, 25, 65, 78, 0, 32],
    ];

    data = {
      labels: [
        "2 May",
        "4 May",
        "6 May",
        "8 May",
        "10 May",
        "12 May",
        "14 May",
      ],
      datasets: [
        {
          fill: true,
          lineTension: 0.1,
          backgroundColor: "#8e24aa11",
          borderColor: "#8e24aa",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#8e24aa",
          pointBackgroundColor: "#8e24aa",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#8e24aa",
          pointHoverBorderColor: "#8e24aa",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: getRandomPoints(),
        },
      ],
    };
  } else if (graphValue == 30) {
    randomPoints = [
      [65, 59, 100, 80, 10, 56, 72, 45, 67, 55, 42, 56, 73, 92, 95],
      [10, 50, 30, 84, 38, 90, 42, 77, 100, 0, 100, 26, 31, 36, 84],
      [0, 59, 100, 80, 10, 56, 100, 0, 26, 23, 32, 23, 45, 51, 62],
      [100, 42, 77, 100, 0, 100, 72, 45, 67, 55, 42, 21, 22, 28, 96],
      [0, 100, 47, 19, 90, 34, 25, 65, 78, 0, 32, 21, 22, 28, 96],
    ];

    data = {
      labels: [
        "16 April",
        "18 April",
        "20 April",
        "22 April",
        "24 April",
        "26 April",
        "28 April",
        "30 April",
        "2 May",
        "4 May",
        "6 May",
        "8 May",
        "10 May",
        "12 May",
        "14 May",
      ],
      datasets: [
        {
          fill: true,
          lineTension: 0.1,
          backgroundColor: "#8e24aa11",
          borderColor: "#8e24aa",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#8e24aa",
          pointBackgroundColor: "#8e24aa",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#8e24aa",
          pointHoverBorderColor: "#8e24aa",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: getRandomPoints(),
        },
      ],
    };
  } else if (graphValue == 90) {
    randomPoints = [
      [65, 59, 100, 80, 10, 56, 72, 45, 67, 55, 42],
      [10, 50, 30, 84, 38, 90, 42, 77, 100, 0, 100],
      [0, 59, 100, 80, 10, 56, 100, 0, 26, 23, 32],
      [100, 42, 77, 100, 0, 100, 72, 45, 67, 55, 42],
      [0, 100, 47, 19, 90, 34, 25, 65, 78, 0, 32],
    ];

    data = {
      labels: [
        "20 Feb",
        "6 March",
        "20 March",
        "3 April",
        "17 April",
        "1 May",
        "14 May",
      ],
      datasets: [
        {
          fill: true,
          lineTension: 0.1,
          backgroundColor: "#8e24aa11",
          borderColor: "#8e24aa",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#8e24aa",
          pointBackgroundColor: "#8e24aa",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#8e24aa",
          pointHoverBorderColor: "#8e24aa",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: getRandomPoints(),
        },
      ],
    };
  }
  let options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} width={400} height={150} />;
};

export default Graph;
