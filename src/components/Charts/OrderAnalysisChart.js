import React from "react";
import Chart from "react-apexcharts";

const OrderAnalysisChart = ({ OrderAnalysisSeries, OrderAnalysisOptions }) => {
  return (
    <div className="line-chart">
      <Chart
        options={OrderAnalysisOptions}
        series={OrderAnalysisSeries}
        type="line"
        height={230}
      />
    </div>
  );
};

export default OrderAnalysisChart;
