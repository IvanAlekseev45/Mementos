import css from "./ManageCardModal.module.css";

interface ManageCardModalProps {
  onCloseModal: () => void;
  changeHandler: () => void;
}

const ManageCardModal = ({ onCloseModal, changeHandler }: ManageCardModalProps) => {
  return (
    <div className={css["modal-info"]}>
      <p className={css["modal-title"]}>Manage this memory</p>
      <button className={css["change-button"]} onClick={changeHandler}>
        In more detail..
      </button>
      <button className={css["delete-button"]}>Delete memory..</button>
      <button className={css["close-button"]} onClick={onCloseModal}>
        close
      </button>
    </div>
  );
};

export default ManageCardModal;
