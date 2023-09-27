import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";
import { getOrderById } from "../../store/actions/orderActions";
const ViewOrderDetails = ({ viewDetailsToggle, viewDetails, singleOrder }) => {
  const { order } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderById(singleOrder?.orderId));
  }, [singleOrder]);
  return (
    <div>
      <Modal isOpen={viewDetails} toggle={viewDetailsToggle} size="lg">
        <ModalHeader toggle={viewDetailsToggle}>Order Details</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Payment Method</Label>
                <Input readOnly value={order?.paymentMethod} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Order Type</Label>
                <Input readOnly value={order?.orderType} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Status</Label>
                <Input readOnly value={order?.status} />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>Table Number</Label>
                <Input
                  readOnly
                  value={order?.tableNumber ? order?.tableNumber : "N/A"}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Tip</Label>
                <Input readOnly value={order?.tip ? order?.tip : "N/A"} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Tip Type</Label>
                <Input readOnly value={order?.tipType ? order?.tip : "N/A"} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Total Amount</Label>
                <Input
                  readOnly
                  value={order?.totalAmount ? order?.totalAmount : "N/A"}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Total Price Item</Label>
                <Input readOnly value={order?.totalPriceItem} />
              </FormGroup>
            </Col>
            <Col md={12}>
              <Table responsive>
                <thead>
                  <th>Item Name</th>
                  <th>Item Quantity</th>
                  <th>Item Price</th>
                  <th>Item Size</th>
                  <th>Item Total Price</th>
                </thead>
                <tbody>
                  {order?.order?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.name}</td>
                        <td>{item?.quantity}</td>
                        <td>{item?.price}</td>
                        <td>{item?.size}</td>
                        <td>{item?.totalPrice}</td>
                      </tr>
                    );
                  })}
                  <tr></tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ViewOrderDetails;
