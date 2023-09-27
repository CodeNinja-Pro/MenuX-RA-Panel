import { useState } from "react";
import firebase from "../../config/firebase";
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
import { useDispatch, useSelector } from "react-redux";
import { addCheckoutQuestion } from "../../store/actions/checkoutQuestionAction";
function AddCheckoutQuestionModal({ addModal, addToggle }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.checkoutQuestion);
  const { uid } = useSelector((state) => state.auth);

  const [questionData, setQuestionData] = useState({
    title: "",
    type: "",
  });
  const [isMandatory, setIsMandatory] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestionData((prevQuestionData) => ({
      ...prevQuestionData,
      [name]: value,
    }));
  };

  const handleCatalogSubmit = (e) => {
    e.preventDefault();
    let obj = {
      ...questionData,
      isMandatory: isMandatory,
      restaurantID: uid,
      createdAt: firebase.firestore.Timestamp.now(),
    };

    dispatch(
      addCheckoutQuestion(obj, () => {
        setQuestionData({
          title: "",
          type: "",
        });
        setIsMandatory(false);
        addToggle();
      })
    );
  };

  return (
    <div>
      <Modal isOpen={addModal}>
        <ModalHeader toggle={addToggle}>Add Question Details</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleCatalogSubmit}>
            <Row>
              <Col>
                <Label className="my-2">Question</Label>

                <Input
                  type="text"
                  required
                  name="title"
                  value={questionData.title}
                  placeholder="Question"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <FormGroup>
                  <Label>Type</Label>
                  <Input
                    type="select"
                    id="exampleCustomSelect"
                    name="type"
                    required
                    value={questionData.type}
                    onChange={handleInputChange}
                  >
                    <option value="" selected disabled>
                      Select Type
                    </option>
                    <option value="marketing">Marketing</option>
                    <option value="order">Order</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <div className="mx-3">
              <Input
                type="checkbox"
                value={isMandatory}
                onChange={(e) => {
                  setIsMandatory(e.target.checked);
                }}
              />{" "}
              IsMandatory
            </div>
            <Row>
              <Col>
                <div className="d-flex justify-content-end ">
                  <Button color="primary" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Add"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AddCheckoutQuestionModal;
