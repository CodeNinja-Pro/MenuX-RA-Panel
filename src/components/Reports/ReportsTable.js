import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Row,
  Input,
  Col,
  Button,
} from "reactstrap";

import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import MultiRangeSlider from "../slider/MultiRangeSlider";
import RangeSlider from "../slider/RangeSlider";
import { useSelector } from "react-redux";

function ReportsTable({ data }) {
  const { user, userPermissions } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState([25, 50]);
  const [pay, setPay] = useState("");
  const ref = useRef(null);

  const reportsPermissions = userPermissions?.reports;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  const [datestate, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const dateRangeString =
    datestate.length > 0
      ? `${moment(datestate[0].startDate).format("DD MMM YYYY")} - ${moment(
          datestate[0].endDate
        ).format("DD MMM YYYY")}`
      : `${moment().format("DD MMM YYYY")} - ${moment().format("DD MMM YYYY")}`;

  return (
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader>
            <Row>
              {" "}
              <Col xs="12">
                <h3 className="mb-3">Reports</h3>
              </Col>
            </Row>
            <Row className="d-flex justify-content-end">
              <Col sm="6" lg="3">
                <Input type="select">
                  <option value="">Select Gender</option>
                  <option value="">Male</option>
                  <option value="">Female</option>
                </Input>
              </Col>
              <Col sm="6" lg="3" className="mt-3 mt-sm-0 text-center">
                <RangeSlider value={value} setValue={setValue} />
                <span className="text-nowrap text-center">Age Range</span>
              </Col>
              <Col sm="6" lg="3" className="mt-3 mt-lg-0">
                {" "}
                <div ref={ref}>
                  <Input
                    value={dateRangeString}
                    className="pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    readOnly
                  />
                  {isOpen && (
                    <DateRangePicker
                      onChange={(item) => setDateState([item.selection])}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={datestate}
                      direction="horizontal"
                      preventSnapRefocus={true}
                      calendarFocus="backwards"
                      className="dateRangerSet"
                    />
                  )}
                </div>
              </Col>
              <Col sm="6" lg="3" className="mt-3 mt-lg-0">
                {user?.type == "kitchen-admin" ? (
                  <>
                    {reportsPermissions?.export && (
                      <Button color="primary" block>
                        Export
                      </Button>
                    )}
                  </>
                ) : (
                  <Button color="primary" block>
                    Export
                  </Button>
                )}
              </Col>
            </Row>
          </CardHeader>

          {user?.type == "kitchen-admin" ? (
            <>
              {reportsPermissions?.get ? (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Order No</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Price</th>
                      <th scope="col">Payment method</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((el, id) => {
                      return (
                        <tr key={id}>
                          <th scope="row">{el?.orderNumber}</th>
                          <td> {el?.orders}</td>
                          <td> {el?.price}</td>
                          <td> {el?.paymentMethod}</td>
                          <td> {el?.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <Row className="py-4 justify-content-center align-items-center">
                  You don't have the permission to access the page
                </Row>
              )}
            </>
          ) : (
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Order No</th>
                  <th scope="col">Orders</th>
                  <th scope="col">Price</th>
                  <th scope="col">Payment method</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, id) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{el?.orderNumber}</th>
                      <td> {el?.orders}</td>
                      <td> {el?.price}</td>
                      <td> {el?.paymentMethod}</td>
                      <td> {el?.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}

          <CardFooter className="py-4">
            <nav aria-label="...">
              <Pagination
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
              >
                <PaginationItem className="disabled">
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    tabIndex="-1"
                  >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="active">
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    2 <span className="sr-only">(current)</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </CardFooter>
        </Card>
      </div>
    </Row>
  );
}

export default ReportsTable;
