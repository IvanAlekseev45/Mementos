import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import css from "./App.module.css";
import CardList from "./CardList/CardList";
import Header from "./Header/Header";
import { createMemory, getAllMemories } from "../services/memory";
import type { Memory, CreatePhoto } from "../types/memories";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import ChangeMemory from "./ChangeMemory/ChangeMemory";
import { createPortal } from "react-dom";
import Modal from "./Modal/Modal";
import ManageCardModal from "./ManageCardModal/ManageCardModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [value] = useDebounce(query, 300);
  const [isShowChange, setIsShowChange] = useState(false);
  const [cardInfo, setcardInfo] = useState<Memory | null>(null);
  const [cardItem, setCardItem] = useState<Memory | null>(null);

  const onOpenModal = (id: Memory["_id"]) => {
    const card = cards.find((el) => el._id === id);
    setcardInfo(card ?? null);
    setCardItem(card || null);
  };

  const onCloseModal = () => {
    setcardInfo(null);
  };

  const changeHandler = () => {
    setcardInfo(null);
    setIsShowChange(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onSearchQuery = (value: string) => {
    setQuery(value);
  };

  const { data } = useQuery({
    queryKey: ["memories", value],
    queryFn: () => getAllMemories(value),
    placeholderData: keepPreviousData,
  });
  const cards = data ?? [];

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["memories"],
    mutationFn: createMemory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["memories"],
      });
    },
  });

  const onSubmit = (q: CreatePhoto) => {
    mutate(q);
  };

  return (
    <div className={css["container"]}>
      <Header onSubmitInfo={onSubmit} onSubmit={onSearchQuery} />
      {isShowChange && <ChangeMemory cardInfo={cardItem} />}
      <CardList cards={cards} onOpenModal={onOpenModal} />
      {cardInfo &&
        createPortal(
          <Modal>
            <ManageCardModal onCloseModal={onCloseModal} changeHandler={changeHandler} />
          </Modal>,
          document.body,
        )}
    </div>
  );
};

export default App;
