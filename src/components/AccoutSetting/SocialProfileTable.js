import React, { useState } from "react";
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
} from "reactstrap";

const SocialProfileTable = ({
  data,
  addToggle,
  editToggle,
  deleteToggle,
  setEditData,
  setIndex,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

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

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageData = data?.slice(startIndex, endIndex);

  return (
    <>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <h3 className=" pt-2 ">Social Profile</h3>
              </div>

              <Button color="primary" onClick={addToggle}>
                Add
              </Button>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">URL</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  pageData?.map((el, id) => {
                    return (
                      <tr key={id}>
                        <td> {el?.type}</td>
                        <td> {el?.url}</td>
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
};

export default SocialProfileTable;
