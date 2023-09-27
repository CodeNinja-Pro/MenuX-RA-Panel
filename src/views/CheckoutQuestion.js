import React, { useEffect, useState } from "react";
// reactstrap components
import { Container } from "reactstrap";
// core components
import OnlyHeader from "../components/Headers/OnlyHeader.js";

import { useDispatch, useSelector } from "react-redux";

import AddCheckoutQuestionModal from "../components/Modals/AddCheckoutQuestionModal";
import CheckoutQuestionTable from "../components/CheckoutQuestion/CheckoutQuestionTable";
import { getCheckoutQuestion } from "../store/actions/checkoutQuestionAction";

const CheckoutQuestion = () => {
  const [addModal, setAddModal] = useState(false);

  const dispatch = useDispatch();

  const addToggle = () => {
    setAddModal(!addModal);
  };
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCheckoutQuestion(uid));
  }, [uid]);

  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <CheckoutQuestionTable addToggle={addToggle} />
        <AddCheckoutQuestionModal addModal={addModal} addToggle={addToggle} />
      </Container>
    </>
  );
};

export default CheckoutQuestion;
