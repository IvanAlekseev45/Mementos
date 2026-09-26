import type { Memory } from "../../types/memories";
import css from "./CardItem.module.css";

interface CardItemProps {
  card: Memory;
  onOpenModal: (id: Memory["_id"]) => void;
}

const CardItem = ({ card, onOpenModal }: CardItemProps) => {
  return (
    <li className={css["card-item"]}>
      <img className={css["img-item"]} src={card.image} alt={card.description} />
      <h2 className={css["title-item"]}>{card.title}</h2>
      <p className={css["date-item"]}>{card.date}</p>
      <p className={css["description-item"]}>{card.description}</p>
      <p>{card.location}</p>
      <button onClick={() => onOpenModal(card._id)} className={css["card-btn"]}>
        ...
      </button>
    </li>
  );
};

export default CardItem;
