import css from "./Paginate.module.css";

interface PaginateProps {
  page: number;
  inc: () => void;
  dec: () => void;
}

const Paginate = ({ page, inc, dec }: PaginateProps) => {
  return (
    <div className={css["paginate"]}>
      <button onClick={dec}>Prev</button>
      <p>{page}</p>
      <button onClick={inc}>Next</button>
    </div>
  );
};

export default Paginate;
