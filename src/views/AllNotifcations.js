import OnlyHeader from "../components/Headers/OnlyHeader";
import Notfications from "../components/Navbars/Notfications";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, Container, Row } from "reactstrap";
import { getNotifications } from "../store/actions/RequestActions";

const AllNotifcations = () => {
  const dispatch = useDispatch();
  const { user, userPermissions } = useSelector((state) => state.auth);
  const { allNotifications } = useSelector((state) => state.requests);

  const notifcationPermissions = userPermissions?.notifications;
  useEffect(() => {
    dispatch(getNotifications(user?.restaurantID));
  }, []);

  return (
    <>
      <OnlyHeader />
      <Container fluid className="mt--7">
        <div className="col">
          <Card className="shadow">
            <CardHeader className="d-lg-flex d-sm-block justify-content-between">
              <h3 className="mb-0 pt-2 ">Notifications</h3>
            </CardHeader>

            <Container className="my-4">
              {user?.type == "kitchen-admin" ? (
                <>
                  {notifcationPermissions?.get ? (
                    <Notfications data={allNotifications} />
                  ) : (
                    <Row className="py-4 justify-content-center align-items-center">
                      You don't have the permission to access the page
                    </Row>
                  )}
                </>
              ) : (
                <Notfications data={allNotifications} />
              )}
            </Container>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default AllNotifcations;
