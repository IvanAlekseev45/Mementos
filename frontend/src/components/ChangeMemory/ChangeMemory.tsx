import type { Memory } from "../../types/memories";
import css from "./ChangeMemory.module.css";

interface ChangeMemoryProps {
  cardInfo: Memory | null;
}

const ChangeMemory = ({ cardInfo }: ChangeMemoryProps) => {
  return (
    <div className={css["change-memory"]}>
      <div className={css["desc-div"]}>
        <p className={css["title"]}>{cardInfo?.title}</p>
        <p className={css["date"]}>{cardInfo?.date}</p>
        <p className={css["description"]}>{cardInfo?.description}</p>
        <p className={css["location"]}>{cardInfo?.location}</p>
      </div>
      <div className={css["photo-wrapper"]}>
        <img src={cardInfo?.image} alt={cardInfo?.description} className={css["photo"]} />
      </div>
    </div>
  );
};

export default ChangeMemory;
