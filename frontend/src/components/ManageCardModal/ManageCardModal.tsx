import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Memory } from "../../types/memories";
import css from "./ManageCardModal.module.css";
import { deleteCardById } from "../../services/memory";

interface ManageCardModalProps {
  onCloseModal: () => void;
  changeHandler: () => void;
  cardItem: Memory | null;
}

const ManageCardModal = ({
  onCloseModal,
  changeHandler,

  cardItem,
}: ManageCardModalProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["deleteById"],
    mutationFn: deleteCardById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["memories"],
      });
      onCloseModal();
    },
  });

  const deleteHandler = () => {
    if (cardItem?._id) {
      mutate(cardItem._id);
    }
  };
  return (
    <div className={css["modal-info"]}>
      <p className={css["modal-title"]}>Manage this memory</p>
      <button className={css["change-button"]} onClick={changeHandler}>
        In more detail..
      </button>
      <button className={css["delete-button"]} onClick={deleteHandler}>
        Delete memory..
      </button>
      <button className={css["close-button"]} onClick={onCloseModal}>
        close
      </button>
    </div>
  );
};

export default ManageCardModal;
