import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { addTips } from "../../store/actions/settingAction";
const AddTipModal = ({ addModal, addToggle }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.catalog);
  const [value, setValue] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      addTips(uid, value, () => {
        addToggle();
        setValue("");
      })
    );
  };

  return (
    <div>
      <Modal isOpen={addModal}>
        <ModalHeader toggle={addToggle}>Add Tip Percentages</ModalHeader>
        <ModalBody className="pt-0">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Enter Tip Value</Label>
              <Input
                type="text"
                placeholder="Enter Tip Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormGroup>
            <div className="d-flex justify-content-end">
              <Button
                color="primary"
                type="submit"
                disabled={loading || !value}
              >
                {loading ? <Spinner size="sm" /> : "Add"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddTipModal;
