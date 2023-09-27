import { useState } from "react";
import firebase from "../../config/firebase";
import { enqueueSnackbar } from "notistack";
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
import PickDateRange from "../../views/auth/PickDateRange";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addCatalog } from "../../store/actions/catalogAction";
import moment from "moment";
function AddCatalogModal({ addModal, addToggle }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.catalog);
  const { uid } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    category: "",
    startTime: "",
    endTime: "",
    availability: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const [datestate, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const handleCatalogSubmit = (e) => {
    e.preventDefault();
    if (formData.startTime === formData.endTime) {
      enqueueSnackbar("Start time and End time cannot be the same.");
      return;
    }
    if (formData.availability === "available every day") {
      let obj = {
        ...formData,
        restaurantID: uid,
        createdAt: firebase.firestore.Timestamp.now(),
      };
      dispatch(
        addCatalog(obj, () => {
          setFormData({
            category: "",
            startTime: "",
            endTime: "",
            availability: "",
          });
          addToggle();
        })
      );
    } else {
      let obj = {
        ...formData,
        availabilityDate: {
          startDate: datestate[0].startDate,
          endDate: datestate[0].endDate,
        },
        restaurantID: uid,
        createdAt: firebase.firestore.Timestamp.now(),
      };
      dispatch(
        addCatalog(obj, () => {
          setFormData({
            category: "",
            startTime: "",
            endTime: "",
            availability: "",
          });
          setDateState({
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
          });
          addToggle();
        })
      );
    }
  };

  return (
    <div>
      <Modal isOpen={addModal}>
        <ModalHeader toggle={addToggle}>Add Catalog Details</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleCatalogSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="location">Categories</Label>
                  <Input
                    type="select"
                    id="exampleCustomSelect"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="" selected disabled>
                      Select Categories
                    </option>
                    <option value="breakfast">Breakfast</option>
                    <option value="dinner">Dinner</option>
                    <option value="lunch">Lunch</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="start-time">Start Time</Label>
                  <Input
                    type="time"
                    name="startTime"
                    id="date-inp"
                    required
                    placeholder="Start time"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              {" "}
              <Col>
                <FormGroup>
                  <Label for="start-time">End Time</Label>
                  <Input
                    type="time"
                    name="endTime"
                    id="date-inp"
                    required
                    placeholder="End time"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="start-time">Availability</Label>
              <Input
                type="select"
                name="availability"
                required
                placeholder="Availability"
                value={formData.availability}
                onChange={handleInputChange}
              >
                <option value="">Please select</option>
                <option value="available every day">Available Every Day</option>
                <option value="available specific day">
                  Available Specific Day
                </option>
              </Input>
            </FormGroup>
            {formData.availability === "available specific day" ? (
              <>
                <Row>
                  <Col className="mb-3 catalog__picker">
                    <PickDateRange
                      setDateState={setDateState}
                      datestate={datestate}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              ""
            )}

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

export default AddCatalogModal;
