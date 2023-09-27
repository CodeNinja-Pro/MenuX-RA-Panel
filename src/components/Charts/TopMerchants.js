import React from "react";
import Bar from "react-apexcharts";

const TopMerchants = ({ topMerchantOptions, topMerchantSeries }) => {
  return (
    <div className="py-2">
      <Bar
        options={topMerchantOptions}
        series={topMerchantSeries}
        type="bar"
        width="100%"
        height={250}
      />
    </div>
  );
};

export default TopMerchants;
