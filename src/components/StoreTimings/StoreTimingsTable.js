import { useState } from "react";
import { useHistory } from "react-router-dom";
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
  FormGroup,
  Input,
  Col,
} from "reactstrap";
function StoreTimingsTable({
  data,
  addToggle,
  editToggle,
  deleteToggle,
  setEditData,
  setIndex,
}) {
  const history = useHistory();
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

  //   const filteredResponses = data?.filter((item) => item.day === dayName);
  //   pagination coding and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const numPages = Math.ceil(data?.length / pageSize);

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
  return (
    <>
      {/* Table */}
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="d-lg-flex justify-content-between">
              <div className="d-flex align-items-center">
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => {
                    history.push("/admin/settings");
                  }}
                >
                  <i className="fas fa-arrow-left "></i>
                </Button>

                <h3 className=" pt-2 ">Store Timings</h3>
              </div>
              <div className="d-lg-flex">
                <Input
                  id="exampleSelect"
                  value={pageSize}
                  onChange={handlePageChange} // Here
                  type="select"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Input>
                <Button
                  color="primary"
                  className="btn btn-block mx-2 add_store_timings"
                  onClick={addToggle}
                >
                  Add
                </Button>
              </div>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Days</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(startIndex, endIndex).map((el, id) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{el?.day}</th>
                      <td>{returnDate(el?.startTime)}</td>
                      <td> {returnDate(el?.endTime)}</td>
                      <td>
                        <Button
                          className="btn-sm"
                          color="primary"
                          onClick={() => {
                            setEditData(el);
                            setIndex(id);
                            editToggle();
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn-sm"
                          color="danger"
                          onClick={() => {
                            setEditData(el);
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
    </>
  );
}

export default StoreTimingsTable;
