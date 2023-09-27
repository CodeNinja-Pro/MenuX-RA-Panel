import React from "react";
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
import { addSocialProfile } from "../../store/actions/settingAction";

const AddSocialProfileModal = ({ addModal, addToggle }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.catalog);
  const [formData, setFormData] = useState({ type: "", url: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "type") {
      setFormData({
        ...formData,
        [name]: value.toLowerCase(),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission with formData
    console.log(formData);
    dispatch(
      addSocialProfile(uid, formData, () => {
        addToggle();
        setFormData({ type: "", url: "" });
      })
    );
  };
  return (
    <div>
      <Modal isOpen={addModal}>
        <ModalHeader toggle={addToggle}>Add Social Profile</ModalHeader>
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
              <Button
                color="primary"
                type="submit"
                disabled={loading || formData.type == "" || formData.url == ""}
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

export default AddSocialProfileModal;
