import OnlyHeader from "../components/Headers/OnlyHeader";
import HolidaysTable from "../components/Holidays/HolidaysTable";
import AddHolidaysModal from "../components/Modals/AddHolidaysModal";
import AddStoreTimingModal from "../components/Modals/AddStoreTimingModal";
import DeleteCatalogModal from "../components/Modals/DeleteCatalogModal";
import EditHolidaysModal from "../components/Modals/EditHolidaysModal";
import EditStoreTimingModal from "../components/Modals/EditStoreTimingsModal";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

function Holidays() {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState("");
  const [index, setIndex] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const { user, uid } = useSelector((state) => state.auth);

  const addToggle = () => {
    setAddModal(!addModal);
  };
  const editToggle = () => {
    setEditModal(!editModal);
  };
  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };
  const data = [
    {
      title: "Pakistan day",
      date: "01/02/2023",
    },
    {
      title: "Eid-ul-Fitr Holiday",
      date: "02/02/2023",
    },
    {
      title: "Christmas",
      date: "05/02/2023",
    },
  ];
  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <HolidaysTable
          data={user?.holidays ? user?.holidays : []}
          addToggle={addToggle}
          editToggle={editToggle}
          deleteToggle={deleteToggle}
          setEditData={setEditData}
          setIndex={setIndex}
        />
      </Container>
      <AddHolidaysModal addModal={addModal} addToggle={addToggle} />
      <EditHolidaysModal
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
        title={"Holidays"}
      />
    </>
  );
}

export default Holidays;
