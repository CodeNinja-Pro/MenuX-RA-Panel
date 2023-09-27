import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Card,
  CardBody,
} from "reactstrap";

function OrderModal({ modal, toggle }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
        <ModalBody>
          <Card className="my-2">
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Order Status </span>
                <Button size="sm">Pending</Button>
                <Button size="sm" color="primary">
                  Change Order to Cooking
                </Button>
              </div>
            </CardBody>
          </Card>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Dish Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Pizza</th>
                <td>2</td>
                <td>$10</td>
              </tr>
              <tr>
                <th scope="row">Italian Burger</th>
                <td>5</td>
                <td>$10</td>
              </tr>
              <tr>
                <th scope="row">Burger</th>
                <td>1</td>
                <td>$10</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}

export default OrderModal;
