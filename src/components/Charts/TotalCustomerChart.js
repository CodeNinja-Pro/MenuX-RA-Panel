import React from "react";
import Bar from "react-apexcharts";

const TotalCustomerChart = () => {
  const options = {
    chart: {
      id: "basic-line",
      toolbar: {
        show: false,
      },
    },
    colors: ["#F765A3", "#34C759"],
    xaxis: {
      categories: ["Jan", "Feb", "Oct", "Nov", "Dec"],
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Returning Customers",
      data: [30, 40, 70, 50, 43],
    },
    {
      name: "New Customers",
      data: [40, 10, 20, 60, 13],
    },
  ];
  return (
    <div>
      <Bar
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={250}
      />
    </div>
  );
};

export default TotalCustomerChart;
