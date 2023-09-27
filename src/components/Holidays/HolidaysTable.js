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
  Input,
  Col,
} from "reactstrap";
function HolidaysTable({
  data,
  addToggle,
  editToggle,
  deleteToggle,
  setEditData,
  setIndex,
}) {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter((el) =>
    el.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const numPages = Math.ceil(filteredData.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const slicedData = filteredData.slice(startIndex, endIndex);

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
            <CardHeader className="d-lg-flex  justify-content-between">
              <Col lg={4}>
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

                  <h3 className=" pt-2 ">Holidays</h3>
                </div>
              </Col>
              <Col lg={4}>
                <Input
                  className="my-2 my-lg-0"
                  placeholder="Search by title"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  type="text"
                />
              </Col>
              <Col lg={4} className="d-lg-flex justify-content-between">
                <Input
                  id="exampleSelect"
                  className="my-2 my-lg-0 mx-0 mx-lg-4"
                  value={pageSize}
                  onChange={handlePageChange}
                  type="select"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Input>

                <Button
                  color="primary"
                  className="btn btn-block mx-0 mx-lg-3"
                  onClick={addToggle}
                >
                  Add
                </Button>
              </Col>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Date</th>

                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slicedData.map((el, id) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{el?.title}</th>
                      <td>{el?.date}</td>
                      <td>
                        <Button
                          className="btn-sm"
                          color="primary"
                          onClick={() => {
                            setIndex(id);
                            setEditData(el);
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

export default HolidaysTable;
