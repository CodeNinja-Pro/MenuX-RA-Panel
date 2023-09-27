import moment from "moment";
import { useEffect, useState } from "react";
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
import { updateCatalog } from "../../store/actions/catalogAction";
import { useDispatch, useSelector } from "react-redux";

function EditCatalogModal({ editModal, editToggle, editData, id }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.catalog);
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

  useEffect(() => {
    setFormData({
      category: editData?.category,
      startTime: editData?.startTime,
      endTime: editData?.endTime,
      availability: editData?.availability,
    });
    if (editData?.availabilityDate) {
      setDateState([
        {
          startDate: moment
            .unix(editData?.availabilityDate?.startDate.seconds)
            .toDate(),
          endDate: moment
            .unix(editData?.availabilityDate?.endDate.seconds)
            .toDate(),
          key: "selection",
        },
      ]);
    }
  }, [editData]);

  const handleCatalogSubmit = (e) => {
    e.preventDefault();
    if (formData.availability == "available every day") {
      let obj = {
        ...formData,
        restaurantID: editData?.restaurantID,
        createdAt: editData?.createdAt,
      };
      dispatch(
        updateCatalog(id, obj, () => {
          setFormData({
            category: "",
            startTime: "",
            endTime: "",
            availability: "",
          });
          editToggle();
        })
      );
    } else {
      let obj = {
        ...formData,
        restaurantID: editData?.restaurantID,
        createdAt: editData?.createdAt,
        availabilityDate: {
          startDate: datestate[0].startDate,
          endDate: datestate[0].endDate,
        },
      };
      dispatch(
        updateCatalog(id, obj, () => {
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
          editToggle();
        })
      );
    }
  };

  return (
    <div>
      <Modal isOpen={editModal}>
        <ModalHeader toggle={editToggle}>Update Catalog Details</ModalHeader>
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
            {formData.availability == "available specific day" &&
            datestate != [] ? (
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
                {loading ? <Spinner size="sm" /> : "Update"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditCatalogModal;
