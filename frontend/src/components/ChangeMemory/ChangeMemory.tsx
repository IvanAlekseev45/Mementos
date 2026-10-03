import { useParams } from "react-router-dom";
import css from "./ChangeMemory.module.css";
import { useQuery } from "@tanstack/react-query";
import { getMemoryById } from "../../services/memory";
import type { Memory } from "../../types/memories";
import { useState } from "react";
import EditMemoryCard from "../EditMemoryCard/EditMemoryCard";

const ChangeMemory = () => {
  const { id = "" } = useParams();
  const [isShowModal, setIsShowModal] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["cardById", { id }],
    queryFn: () => getMemoryById(id as Memory["_id"]),
    retry: 2,
  });

  const onCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <div className={css["page"]}>
          <div className={css["change-memory"]}>
            <div className={css["desc-div"]}>
              <p className={css["title"]}>{data?.title}</p>
              <p className={css["date"]}>{data?.date}</p>
              <p className={css["description"]}>{data?.description}</p>
              <p className={css["location"]}>{data?.location}</p>
              <button className={css["change-memory-btn"]} onClick={() => setIsShowModal(true)}>
                Change your memory..
              </button>
              {isShowModal && <EditMemoryCard data={data} onCloseModal={onCloseModal} />}
            </div>
            <div className={css["photo-wrapper"]}>
              <img src={data?.image} alt={data?.description} className={css["photo"]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeMemory;
