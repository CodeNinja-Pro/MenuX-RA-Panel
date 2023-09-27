import React from "react";
import { useState } from "react";
import ClientSettingTable from "../components/ClientSetting/ClientSettingTable";
import OnlyHeader from "../components/Headers/OnlyHeader";
import { Container } from "reactstrap";
import AddTipModal from "../components/Modals/AddTipModal";
import { useSelector } from "react-redux";
import EditTipModal from "../components/Modals/EditTipModal";
import DeleteCatalogModal from "../components/Modals/DeleteCatalogModal";

const ClientSettings = () => {
  const { user, uid } = useSelector((state) => state.auth);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editData, setEditData] = useState("");
  const [index, setIndex] = useState("");

  const addToggle = () => {
    setAddModal(!addModal);
  };
  const editToggle = () => {
    setEditModal(!editModal);
  };
  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <ClientSettingTable
          data={user?.tipPercentages ? user?.tipPercentages : []}
          addToggle={addToggle}
          editToggle={editToggle}
          deleteToggle={deleteToggle}
          setEditData={setEditData}
          setIndex={setIndex}
        />
      </Container>
      <AddTipModal addModal={addModal} addToggle={addToggle} />

      <EditTipModal
        editModal={editModal}
        editToggle={editToggle}
        editData={editData}
        index={index}
      />
      <DeleteCatalogModal
        deleteModal={deleteModal}
        deleteToggle={deleteToggle}
        editData={editData}
        id={uid}
        title={"Tip"}
      />
    </>
  );
};

export default ClientSettings;
