import moment from "moment";
import { useSelector } from "react-redux";
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
} from "reactstrap";
function CatalogTable({
  data,
  addToggle,
  editToggle,
  deleteToggle,
  setEditData,
  setId,
}) {
  const { user, userPermissions } = useSelector((state) => state.auth);
  const catalogPermissions = userPermissions?.catalog;
  const returnDate = (startTime) => {
    if (startTime) {
      const date = new Date(`1970-01-01T${startTime}:00`);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
    return "";
  };
  return (
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="d-lg-flex justify-content-between">
            <h3>Catalog</h3>
            <Row>
              <Col xs="12" sm="4" lg="4">
                <Input placeholder="Search here..." />
              </Col>
              <Col xs="12" sm="4" lg="4" className="my-2 my-sm-0">
                {" "}
                <Input
                  type="select"
                  id="exampleCustomSelect"
                  name="customSelect"
                >
                  <option value="">Show Entries</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="10">20</option>
                  <option value="50">50</option>
                </Input>
              </Col>
              <Col xs="12" sm="4" lg="4" className="">
                {user?.type == "kitchen-admin" ? (
                  <>
                    {catalogPermissions?.add ? (
                      <Button color="primary" onClick={addToggle} block>
                        Add
                      </Button>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <Button color="primary" onClick={addToggle} block>
                    Add
                  </Button>
                )}
              </Col>
            </Row>
          </CardHeader>
          {user?.type == "kitchen-admin" ? (
            <>
              {catalogPermissions?.get ? (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Categories</th>
                      <th scope="col">Start time</th>
                      <th scope="col">End time</th>
                      <th scope="col">Availability</th>
                      <th scope="col">Availability Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((el, idx) => {
                      return (
                        <tr key={idx}>
                          <th scope="row">{el.category}</th>
                          <td>{returnDate(el?.startTime)}</td>
                          <td>{returnDate(el?.endTime)}</td>
                          <td> {el?.availability}</td>
                          <td>
                            {el?.availabilityDate
                              ? `${moment
                                  .unix(el?.availabilityDate?.startDate.seconds)
                                  .format("DD-MMM-YYYY")} to 
                              ${moment
                                .unix(el?.availabilityDate?.endDate.seconds)
                                .format("DD-MMM-YYYY")}
												  `
                              : ""}
                          </td>
                          <td>
                            {catalogPermissions?.edit && (
                              <Button
                                className="btn-sm"
                                color="primary"
                                onClick={() => {
                                  setEditData(el);
                                  setId(el?.id);
                                  editToggle();
                                }}
                              >
                                Edit
                              </Button>
                            )}
                            {catalogPermissions?.delete && (
                              <Button
                                className="btn-sm"
                                color="danger"
                                onClick={() => {
                                  setId(el?.id);
                                  deleteToggle();
                                }}
                              >
                                Delete
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <Row>You don't have the permsions to access the page</Row>
              )}
            </>
          ) : (
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Categories</th>
                  <th scope="col">Start time</th>
                  <th scope="col">End time</th>
                  <th scope="col">Availability</th>
                  <th scope="col">Availability Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope="row">{el.category}</th>
                      <td>{returnDate(el?.startTime)}</td>
                      <td>{returnDate(el?.endTime)}</td>
                      <td> {el?.availability}</td>
                      <td>
                        {el?.availabilityDate
                          ? `${moment
                              .unix(el?.availabilityDate?.startDate.seconds)
                              .format("DD-MMM-YYYY")} to 
                              ${moment
                                .unix(el?.availabilityDate?.endDate.seconds)
                                .format("DD-MMM-YYYY")}
												  `
                          : ""}
                      </td>
                      <td>
                        <Button
                          className="btn-sm"
                          color="primary"
                          onClick={() => {
                            setEditData(el);
                            setId(el?.id);
                            editToggle();
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn-sm"
                          color="danger"
                          onClick={() => {
                            setId(el?.id);
                            deleteToggle();
                          }}
                        >
                          Delete
                        </Button>
                      </td>
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

export default CatalogTable;
