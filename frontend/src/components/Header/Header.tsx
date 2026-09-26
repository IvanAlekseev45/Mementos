import { useState } from "react";
import IconSvg from "../IconSvg/IconSvg";
import css from "./Header.module.css";
import AddMamoryForm from "../AddMamoryForm/AddMamoryForm";

import ControlInput from "../ControlInput/ControlInput";
import type { CreatePhoto } from "../../types/memories";

interface HeaderProps {
  onSubmitInfo: (q: CreatePhoto) => void;
  onSubmit: (q: string) => void;
}

const Header = ({ onSubmitInfo, onSubmit }: HeaderProps) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = () => {
    setIsShowModal(true);
  };
  const closeModal = () => {
    setIsShowModal(false);
  };
  return (
    <header className={css["header"]}>
      <div className={css["logo"]}>
        <span className={css["logo-title"]}>Mementos</span>
        <span className={css["logo-description"]}>
          A DIGITAL KEEPSAKE FOR QUIET ADVENTURES & HEARTFELT MEMORIES
        </span>
      </div>

      <button className={css["add-memory-mobile"]}>
        <IconSvg size={20} name={"icon-plus"} />
      </button>
      <ul className={css["buttons-list"]}>
        <li>
          <ControlInput onSubmit={onSubmit} />
        </li>
        <li>
          <button className={css["button-item"]} onClick={showModal}>
            <IconSvg name={"icon-plus"} size={16} />
            Add Memory
          </button>
        </li>
      </ul>

      {isShowModal && <AddMamoryForm closeModal={closeModal} onSubmit={onSubmitInfo} />}
    </header>
  );
};

export default Header;
