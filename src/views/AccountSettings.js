import React from "react";
import OnlyHeader from "../components/Headers/OnlyHeader";
import AccoutSettingTable from "../components/AccoutSetting/AccoutSettingTable";
import { Container } from "reactstrap";
import SocialProfileTable from "../components/AccoutSetting/SocialProfileTable";
import { useSelector } from "react-redux";
import { useState } from "react";
import AddSocialProfileModal from "../components/Modals/AddSocialProfileModal";
import DeleteCatalogModal from "../components/Modals/DeleteCatalogModal";
import EditSocialProfileModal from "../components/Modals/EditSocialProfileModal";
import SubscriptionTable from "../components/AccoutSetting/SubscriptionTable";
// import SubscriptionTable from "../components/AccoutSetting/SubscriptionTable";

const AccountSettings = () => {
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
      <Container className="mt--7" fluid>
        <AccoutSettingTable />
        <SocialProfileTable
          data={user?.socialProfiles ? user?.socialProfiles : []}
          addToggle={addToggle}
          editToggle={editToggle}
          deleteToggle={deleteToggle}
          setEditData={setEditData}
          setIndex={setIndex}
        />
        <SubscriptionTable />
      </Container>
      <AddSocialProfileModal addModal={addModal} addToggle={addToggle} />
      <EditSocialProfileModal
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
        title={"Social Profile"}
      />
    </>
  );
};

export default AccountSettings;
