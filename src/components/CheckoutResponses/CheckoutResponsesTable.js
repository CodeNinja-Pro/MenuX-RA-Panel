import ViewOrderDetails from "../Modals/ViewOrderDetails";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Row,
  Button,
  Input,
  Col,
  FormGroup,
} from "reactstrap";
import { getCheckoutResponses } from "../../store/actions/checkoutQuestionAction";
import { addDays } from "date-fns";
import PickDateRange from "../../views/auth/PickDateRange";

function CheckoutResponsesTable({ addToggle }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { responses } = useSelector((state) => state.checkoutQuestion);
  const { customers } = useSelector((state) => state.orders);
  const [filteredResponses, setFilteredResponses] = useState();

  useEffect(() => {
    setFilteredResponses(responses);
  }, [responses]);
  // Handle search filter by customer name
  const handleCustomerName = (event) => {
    const value = event.target.value;
    setCustomerName(value);
    if (customerName == "" && gender == "") {
      setFilteredResponses(responses);
      return;
    } else {
      const filtered = responses.filter((response) => {
        return response?.customerName
          ?.toLowerCase()
          .includes(value.toLowerCase());
      });
      setFilteredResponses(filtered);
    }
  };

  // Handle search filter by customer age
  const handleGenderChange = (event) => {
    const value = event.target.value;
    setGender(value);
    if (customerName == "" && gender == "") {
      setFilteredResponses(responses);
      return;
    } else if (value == "all") {
      setFilteredResponses(responses);
      return;
    } else {
      const filtered = responses.filter((response) => {
        return response?.customerGender === value;
      });
      setFilteredResponses(filtered);
    }
  };

  // Handle search filter by date range
  // Handle date range filter
  // const handleDateRange = (ranges) => {
  //   // console.log(ranges);
  //   if (!customerName && !gender && datestate.length === 1) {
  //     setFilteredResponses(responses);
  //     return;
  //   } else {
  //     const startDate = ranges.startDate;
  //     const endDate = ranges.endDate;
  //     // console.log(startDate, endDate);
  //     const filtered = responses.filter((response) => {
  //       const createdAt = response.createdAt.toDate();

  //       return createdAt >= startDate && createdAt <= endDate;
  //     });

  //     setFilteredResponses(filtered);
  //     setDateState(null);
  //   }
  // };

  //   pagination coding and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const numPages = Math.ceil(filteredResponses?.length / pageSize);

  const pageLinks = [];

  for (let i = 1; i <= numPages; i++) {
    pageLinks.push(
      <PaginationItem key={i} active={i === currentPage}>
        <PaginationLink href="#pablo" onClick={() => setCurrentPage(i)}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  //useEffect hooks

  useEffect(() => {
    dispatch(getCheckoutResponses(id));
  }, []);

  //view details modals
  const [viewDetails, setViewDetails] = useState(false);
  const viewDetailsToggle = () => setViewDetails(!viewDetails);
  const [singleOrder, setSingleOrder] = useState({});

  const [datestate, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [customerName, setCustomerName] = useState("");
  const [gender, setGender] = useState("");

  return (
    <Row>
      <ViewOrderDetails
        viewDetails={viewDetails}
        viewDetailsToggle={viewDetailsToggle}
        singleOrder={singleOrder}
      />
      <div className="col">
        <Card className="shadow">
          <CardHeader className="d-lg-flex justify-content-between">
            <h3>Checkout Responses</h3>
            <Row>
              {/* <Col className="col-4">
                <PickDateRange
                  setDateState={setDateState}
                  datestate={datestate}
                  handleDateRange={handleDateRange}
                />
              </Col> */}

              <Col xs="12" sm="4" lg="4">
                <Input
                  placeholder="Search by name..."
                  value={customerName}
                  onChange={handleCustomerName}
                />
              </Col>
              <Col xs="12" sm="4" lg="4" className="my-2 my-sm-0">
                {" "}
                <FormGroup className="mb-0 mx-2">
                  <Input
                    id="exampleSelect"
                    value={gender}
                    onChange={handleGenderChange} // Here
                    type="select"
                  >
                    <option value="all">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">female</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" sm="4" lg="4" className="my-2 my-sm-0">
                {" "}
                <FormGroup className="mb-0 mx-2">
                  <Input
                    id="exampleSelect"
                    value={pageSize}
                    onChange={handlePageChange} // Here
                    type="select"
                  >
                    <option value="5">Show Entries</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Answer</th>
                <th scope="col">customer Name</th>
                <th scope="col">order Details</th>
                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredResponses?.length > 0 &&
                filteredResponses

                  ?.slice(startIndex, endIndex)

                  ?.map((el, idx) => {
                    return (
                      <tr key={idx}>
                        <th scope="row">{el?.answer}</th>
                        {/* <th scope="row">{el?.customerId}</th> */}
                        <th scope="row">{el?.customerName}</th>
                        <td>
                          <Button
                            className="btn-sm"
                            color="primary"
                            onClick={() => {
                              viewDetailsToggle();
                              setSingleOrder(el);
                            }}
                          >
                            View Order Details
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
          <CardFooter className="py-4">
            <nav aria-label="...">
              <Pagination
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
              >
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    href="#pablo"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                {pageLinks}
                <PaginationItem disabled={currentPage === numPages}>
                  <PaginationLink
                    href="#pablo"
                    onClick={() => setCurrentPage(currentPage + 1)}
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

export default CheckoutResponsesTable;
