import React, { useState } from "react";
import { useEffect } from "react";
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
import { updateTips } from "../../store/actions/settingAction";

const EditTipModal = ({ editModal, editToggle, editData, index }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.catalog);
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTips(uid, index, value, () => {
        editToggle();
      })
    );
  };
  useEffect(() => {
    setValue(editData);
  }, [editData]);

  return (
    <div>
      <Modal isOpen={editModal}>
        <ModalHeader toggle={editToggle}>Edit Tip Percentages</ModalHeader>
        <ModalBody className="pt-0">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Tip</Label>
              <Input
                type="text"
                placeholder="Enter Tip Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormGroup>
            <div className="d-flex justify-content-end">
              <Button color="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Update"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditTipModal;
