import OnlyHeader from "../components/Headers/OnlyHeader";
import AddStoreTimingModal from "../components/Modals/AddStoreTimingModal";
import DeleteCatalogModal from "../components/Modals/DeleteCatalogModal";
import EditStoreTimingModal from "../components/Modals/EditStoreTimingsModal";
import StoreTimingsTable from "../components/StoreTimings/StoreTimingsTable";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

function StoreTimings() {
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

  // const data = [
  // 	{
  // 		day: 'Monday',
  // 		startTime: '09:00 AM',
  // 		endTime: '04:00 PM',
  // 	},
  // 	{
  // 		day: 'Tuesday',
  // 		startTime: '09:00 AM',
  // 		endTime: '04:00 PM',
  // 	},
  // 	{
  // 		day: 'Wednesday',
  // 		startTime: '09:00 AM',
  // 		endTime: '04:00 PM',
  // 	},
  // 	{
  // 		day: 'Friday',
  // 		startTime: '09:00 AM',
  // 		endTime: '12:00 PM',
  // 	},
  // 	{
  // 		day: 'Saturday',
  // 		startTime: '09:00 AM',
  // 		endTime: '04:00 PM',
  // 	},
  // 	{
  // 		day: 'Sunday',
  // 		startTime: '09:00 AM',
  // 		endTime: '04:00 PM',
  // 	},
  // ];
  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <StoreTimingsTable
          data={user?.storeTiming ? user?.storeTiming : []}
          addToggle={addToggle}
          editToggle={editToggle}
          deleteToggle={deleteToggle}
          setEditData={setEditData}
          setIndex={setIndex}
        />
      </Container>
      <AddStoreTimingModal addModal={addModal} addToggle={addToggle} />
      <EditStoreTimingModal
        editModal={editModal}
        editToggle={editToggle}
        index={index}
        editData={editData}
      />

      <DeleteCatalogModal
        deleteModal={deleteModal}
        deleteToggle={deleteToggle}
        editData={editData}
        id={uid}
        title={"StoreTiming"}
      />
    </>
  );
}

export default StoreTimings;
