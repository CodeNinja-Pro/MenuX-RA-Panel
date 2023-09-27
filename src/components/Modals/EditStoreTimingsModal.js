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
import { updateStoreTiming } from "../../store/actions/settingAction";
function EditStoreTimingModal({ editModal, editToggle, index, editData }) {
  const [formData, setFormData] = useState({});
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();
  useEffect(() => {
    setFormData({
      day: editData?.day,
      startTime: editData?.startTime,
      endTime: editData?.endTime,
    });
  }, [editData]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateStoreTiming(uid, index, formData, () => {
        editToggle();
      })
    );
    // Add your logic to handle the form submission
  };
  return (
    <div>
      <Modal isOpen={editModal}>
        <ModalHeader toggle={editToggle}>Update Store Timings</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="location">Days</Label>
                  <Input
                    type="select"
                    id="exampleCustomSelect"
                    name="day"
                    onChange={handleChange}
                    value={formData.day}
                  >
                    <option value="" selected disabled>
                      Select Day
                    </option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <FormGroup>
                  <Label for="start-time">Start Time</Label>
                  <Input
                    type="time"
                    name="startTime"
                    id="start-time"
                    placeholder="Start time"
                    onChange={handleChange}
                    value={formData.startTime}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <FormGroup>
                  <Label for="start-time">End Time</Label>
                  <Input
                    type="time"
                    name="endTime"
                    id="end-time"
                    placeholder="End time"
                    onChange={handleChange}
                    value={formData.endTime}
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

export default EditStoreTimingModal;
