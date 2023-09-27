import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  Row,
  Button,
  Form,
  Label,
  Input,
  FormGroup,
  Spinner,
} from "reactstrap";
import { updateRestaurantProfile } from "../../store/actions/settingAction";

const AccoutSettingTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.setting);
  const [formData, setFormData] = useState({
    name: "",
    // paypalEmail: "",
    location: "",
    subScriptionStatus: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileUpdate = (evt, elements, stripe) => {
    evt.preventDefault();
    dispatch(updateRestaurantProfile(uid, formData));
  };

  useEffect(() => {
    setFormData({
      name: user?.name,
      // paypalEmail: user?.paypalEmail ? user?.paypalEmail : "",
      subScriptionStatus: user?.subScriptionStatus
        ? user?.subScriptionStatus
        : "",
      location: user?.location,
    });
  }, [user]);

  return (
    <>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="d-lg-flex  d-sm-block justify-content-between">
              <div className="d-flex align-items-center">
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => {
                    history.push("/admin/settings");
                  }}
                >
                  <i className="fas fa-arrow-left "></i>
                </Button>

                <h3 className=" pt-2 ">Account Setting</h3>
              </div>
            </CardHeader>
            <div className="mx-3 mx-md-5 my-2">
              <h3 className=" pt-2 ">Update Restaurant Profile</h3>

              <Form onSubmit={(evt) => handleProfileUpdate(evt)}>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter Your Restaurant Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                {/* <FormGroup>
									<Label>Email</Label>
									<Input
										type='text'
										name='email'
										placeholder='Enter Your Email'
										value={formData.email}
										onChange={handleInputChange}
									/>
								</FormGroup> */}
                <FormGroup>
                  <Label>Location</Label>
                  <Input
                    type="text"
                    name="location"
                    required
                    placeholder="Enter Your Location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label>Paypal Email</Label>
                  <Input
                    type="text"
                    name="paypalEmail"
                    placeholder="Enter Your email"
                    value={formData.paypalEmail}
                    onChange={handleInputChange}
                  />
                </FormGroup> */}

                {/* <FormGroup>
                  <Label>SubScription</Label>
                  <Input
                    type="select"
                    name="subScriptionStatus"
                    value={formData.subScriptionStatus}
                    onChange={handleInputChange}
                  >
                    <option value="" selected disabled>
                      Please select
                    </option>
                    <option value="subscribe">Subscribe</option>
                    <option value="unsubscribe">UnSubscribe</option>
                    <option value="resubscribe">ReSubscribe</option>
                  </Input>
                </FormGroup> */}

                <div className="d-flex justify-content-end">
                  <Button
                    color="primary"
                    className="custom-class"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : "Update"}
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </div>
      </Row>
    </>
  );
};

export default AccoutSettingTable;
