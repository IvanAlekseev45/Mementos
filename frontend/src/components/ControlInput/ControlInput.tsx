import { useState, type ChangeEvent } from "react";
import css from "./ControlInput.module.css";

interface ControlInputProps {
  onSubmit: (query: string) => void;
}

const ControlInput = ({ onSubmit }: ControlInputProps) => {
  const [query, setQuery] = useState("");

  const changeInputSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  onSubmit(query);

  return (
    <input
      className={css["control-input"]}
      type="text"
      value={query}
      onChange={changeInputSubmit}
      placeholder="find your memory.."
    />
  );
};

export default ControlInput;
