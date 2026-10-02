import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Memory } from "../../types/memories";
import css from "./ManageCardModal.module.css";
import { deleteCardById } from "../../services/memory";
import { Link } from "react-router-dom";
import { useEffectsForModal } from "../../hooks/modalEffects";

interface ManageCardModalProps {
  onCloseModal: () => void;
  cardItem: Memory | null;
}

const ManageCardModal = ({ onCloseModal, cardItem }: ManageCardModalProps) => {
  useEffectsForModal(onCloseModal);

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
      <Link to={`/memories/${cardItem?._id}`} className={css["change-button"]} target="_blank">
        In more detail..
      </Link>
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
