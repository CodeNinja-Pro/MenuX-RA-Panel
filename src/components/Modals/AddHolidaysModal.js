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
import { addHolidays } from "../../store/actions/settingAction";
function AddHolidaysModal({ addModal, addToggle }) {
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
  });

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
      addHolidays(uid, formData, () => {
        addToggle();
        setFormData({
          title: "",
          date: "",
        });
      })
    );
    // Add your logic to handle the form submission
  };
  return (
    <div>
      <Modal isOpen={addModal}>
        <ModalHeader toggle={addToggle}>Add Holidays</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                required
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
                    required
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Add"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AddHolidaysModal;
