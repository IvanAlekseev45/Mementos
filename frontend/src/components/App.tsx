import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import css from "./App.module.css";
import CardList from "./CardList/CardList";
import Header from "./Header/Header";
import { createMemory, getAllMemories } from "../services/memory";
import type { Memory, CreatePhoto, ApiValidationError, SeasonCategory, DateSort } from "../types/memories";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import ChangeMemory from "./ChangeMemory/ChangeMemory";
import { createPortal } from "react-dom";
import Modal from "./Modal/Modal";
import ManageCardModal from "./ManageCardModal/ManageCardModal";
import { Routes, Route } from "react-router-dom";
import type { AxiosError } from "axios";
import FilterSection from "./FilterSection/FilterSection";
import Paginate from "./Paginate/Paginate";

const App = () => {
  const [query, setQuery] = useState("");
  const [value] = useDebounce(query, 300);
  const [showModal, setShowModal] = useState<Memory | null>(null);
  const [cardItem, setCardItem] = useState<Memory | null>(null);
  const [summer, setSummer] = useState<SeasonCategory>("");
  const [currentPage, setcurrentPage] = useState(1);
  const [dateSort, setDateSort] = useState<DateSort>("");

  const onSortSubmit = (q: DateSort) => {
    setcurrentPage(1);
    setDateSort(q);
  };

  const infoSeason = (q: SeasonCategory) => {
    setcurrentPage(1);
    setSummer(q);
  };

  const onOpenModal = (id: Memory["_id"]) => {
    const card = cards.find((el) => el._id === id);
    setShowModal(card ?? null);
    setCardItem(card || null);
  };

  const onCloseModal = () => {
    setShowModal(null);
  };

  const onSearchQuery = (value: string) => {
    setQuery(value);
  };

  const { data } = useQuery({
    queryKey: ["memories", value, summer, currentPage, dateSort],
    queryFn: () => getAllMemories(value, summer, currentPage, dateSort),
    placeholderData: keepPreviousData,
  });
  const cards = data?.memories ?? [];

  const totalItems = data?.totalItems;

  const seasonCount = data?.seasonCounts ?? [];

  const page = data?.page ?? 1;

  const totalPages = data?.totalPages ?? 1;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["memories"],
    mutationFn: createMemory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["memories"],
      });
    },
    onError: (err: AxiosError<ApiValidationError>) => {
      const myError = err.response?.data.validation.body.message;
      console.log(myError);
    },
  });

  const inc = () => {
    setcurrentPage(page + 1);
  };

  const dec = () => {
    setcurrentPage(page - 1);
  };

  const onSubmit = (q: CreatePhoto) => {
    mutate(q);
  };

  return (
    <div className={css["container"]}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header onSubmitInfo={onSubmit} onSubmit={onSearchQuery} />
              <FilterSection
                totalItems={totalItems}
                infoSeason={infoSeason}
                seasonCount={seasonCount}
                onSortSubmit={onSortSubmit}
                dateSort={dateSort}
              />
              <Paginate page={page} inc={inc} dec={dec} totalPages={totalPages} />

              <CardList cards={cards} onOpenModal={onOpenModal} />

              {showModal &&
                createPortal(
                  <Modal>
                    <ManageCardModal onCloseModal={onCloseModal} cardItem={cardItem} />
                  </Modal>,
                  document.body,
                )}
            </>
          }
        />

        <Route path="/memories/:id" element={<ChangeMemory />} />
      </Routes>
    </div>
  );
};

export default App;
