import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { deleteCatalogsByID } from "../../store/actions/catalogAction";
import { removeTip } from "../../store/actions/settingAction";
import { removeSocialProfile } from "../../store/actions/settingAction";
import { removeStoreTiming } from "../../store/actions/settingAction";
import { removeHoliday } from "../../store/actions/settingAction";
function DeleteCatalogModal({
  deleteModal,
  deleteToggle,
  title,
  editData,
  id,
}) {
  const { loading } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();
  const HandleDeleteBtn = () => {
    if (title == "Catalog") {
      dispatch(
        deleteCatalogsByID(id, () => {
          deleteToggle();
        })
      );
    } else if (title == "Holidays") {
      dispatch(
        removeHoliday(id, editData, () => {
          deleteToggle();
        })
      );
    } else if (title == "Tip") {
      dispatch(
        removeTip(id, editData, () => {
          deleteToggle();
        })
      );
    } else if (title == "Social Profile") {
      dispatch(
        removeSocialProfile(id, editData, () => {
          deleteToggle();
        })
      );
    } else {
      dispatch(
        removeStoreTiming(id, editData, () => {
          deleteToggle();
        })
      );
    }
  };
  return (
    <div>
      <Modal isOpen={deleteModal}>
        <ModalHeader toggle={deleteToggle}>Delete {title}</ModalHeader>
        <ModalBody>
          <h3>Are you sure you want to delete ?</h3>

          <div className="d-flex justify-content-end">
            <Button
              color="primary"
              onClick={HandleDeleteBtn}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Delete"}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DeleteCatalogModal;
