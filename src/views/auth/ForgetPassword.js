import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { forgetPassword } from "../../store/actions/authActions";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Spinner,
} from "reactstrap";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  let { forgetLoading } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      forgetPassword(email, () => {
        history.push("/auth/login");
      })
    );
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h3 className="text-muted">Forget Password?</h3>
              <p>No Worries, we will send you email to reset your password</p>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter your Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  {forgetLoading ? <Spinner size="sm" /> : "Reset Password"}
                </Button>
              </div>
              <Link to="/auth/login">
                <small>Back to Login</small>
              </Link>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ForgetPassword;
