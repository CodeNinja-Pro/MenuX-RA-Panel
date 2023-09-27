import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { updateSocialProfile } from "../../store/actions/settingAction";
const EditSocialProfileModal = ({ editModal, editToggle, editData, index }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.catalog);
  const [formData, setFormData] = useState({ type: "", url: "" });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateSocialProfile(uid, index, formData, () => {
        editToggle();
        setFormData({ type: "", url: "" });
      })
    );
  };

  useEffect(() => {
    setFormData({ type: editData?.type, url: editData?.url });
  }, [editData]);

  return (
    <div>
      <Modal isOpen={editModal}>
        <ModalHeader toggle={editToggle}>Edit Social Profile</ModalHeader>
        <ModalBody className="pt-0">
          <Form onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label>Enter Type</Label>
              <Input
                type="text"
                name="type"
                placeholder="Enter Type"
                value={formData.type}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Enter URL</Label>
              <Input
                type="text"
                name="url"
                placeholder="Enter URL"
                value={formData.url}
                onChange={handleInputChange}
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

export default EditSocialProfileModal;
