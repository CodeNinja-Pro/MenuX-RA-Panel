import React, { useEffect, useState } from "react";
// reactstrap components
import { Container } from "reactstrap";
// core components
import OnlyHeader from "../components/Headers/OnlyHeader.js";
import CatalogTable from "../components/Catalog/CatalogTable";
import AddCatalogModal from "../components/Modals/AddCatalogModal";
import DeleteCatalogModal from "../components/Modals/DeleteCatalogModal";
import EditCatalogModal from "../components/Modals/EditCatalogModal";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogsByID } from "../store/actions/catalogAction";
import AddCheckoutQuestionModal from "../components/Modals/AddCheckoutQuestionModal";
import CheckoutQuestionTable from "../components/CheckoutQuestion/CheckoutQuestionTable";
import { getCheckoutQuestion } from "../store/actions/checkoutQuestionAction";
import { useParams } from "react-router-dom";
import { getCheckoutResponses } from "../store/actions/checkoutQuestionAction";
import CheckoutResponsesTable from "../components/CheckoutResponses/CheckoutResponsesTable";

const CheckoutResponses = () => {
  const [addModal, setAddModal] = useState(false);
  const { id } = useParams();

  const { uid } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const addToggle = () => {
    setAddModal(!addModal);
  };

  useEffect(() => {
    dispatch(getCheckoutResponses(id));
  }, [id]);

  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        <CheckoutResponsesTable addToggle={addToggle} />
        <AddCheckoutQuestionModal addModal={addModal} addToggle={addToggle} />
      </Container>
    </>
  );
};

export default CheckoutResponses;
