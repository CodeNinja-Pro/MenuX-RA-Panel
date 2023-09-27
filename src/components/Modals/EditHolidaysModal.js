import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Spinner,
} from "reactstrap";
import { updateHoliday } from "../../store/actions/settingAction";
function EditHolidaysModal({ editModal, editToggle, editData, index }) {
  const [formData, setFormData] = useState({});
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();
  useEffect(() => {
    setFormData({
      title: editData?.title,
      date: editData?.date,
    });
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateHoliday(uid, index, formData, () => {
        editToggle();
      })
    );
    // Add your logic to handle the form submission
  };

  return (
    <div>
      <Modal isOpen={editModal}>
        <ModalHeader toggle={editToggle}>Edit Holidays</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="start-time">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="date-inp"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Update"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditHolidaysModal;
