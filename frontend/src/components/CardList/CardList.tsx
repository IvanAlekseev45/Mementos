import type { Memory } from "../../types/memories";
import CardItem from "../CardItem/CardItem";
import css from "./CardList.module.css";

interface CardListProps {
  cards: Memory[];
  onOpenModal: (id: Memory["_id"]) => void;
}

const CardList = ({ cards, onOpenModal }: CardListProps) => {
  return (
    <ul className={css["card-list"]}>
      {cards.map((card) => {
        return <CardItem key={card._id} card={card} onOpenModal={onOpenModal} />;
      })}
    </ul>
  );
};

export default CardList;
