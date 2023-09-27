import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { removeRestaurantImage } from "../../store/actions/settingAction";
const DeleteRestaurantImageModal = ({
  deleteModal,
  deleteToggle,
  title,
  editData,
  id,
}) => {
  const { loading } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();
  const HandleDeleteBtn = () => {
    dispatch(
      removeRestaurantImage(id, editData, () => {
        deleteToggle();
      })
    );
  };

  return (
    <div>
      <Modal isOpen={deleteModal}>
        <ModalHeader toggle={deleteToggle}>Delete {title}</ModalHeader>
        <ModalBody className="pt-0">
          <h3>Are you sure you want to delete?</h3>

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
};

export default DeleteRestaurantImageModal;
