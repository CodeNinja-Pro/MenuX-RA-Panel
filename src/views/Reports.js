// reactstrap components
import { Container } from "reactstrap";
// core components
import OnlyHeader from "../components/Headers/OnlyHeader.js";

import ReportsTable from "../components/Reports/ReportsTable";

const Reports = () => {
  const data = [
    {
      orderNumber: "1",
      orders: "2",
      price: "300",
      paymentMethod: "paypal",
      date: "02/02/2023",
    },
    {
      orderNumber: "2",
      orders: "3",
      price: "400",
      paymentMethod: "paypal",
      date: "02/02/2023",
    },
    {
      orderNumber: "67",
      orders: "5",
      price: "700",
      paymentMethod: "paypal",
      date: "03/02/2023",
    },
  ];
  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7 mb-5" fluid>
        {/* Table */}
        <ReportsTable data={data} />
      </Container>
    </>
  );
};

export default Reports;
