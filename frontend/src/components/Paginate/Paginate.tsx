import css from "./Paginate.module.css";

interface PaginateProps {
  page: number;
  totalPages: number;
  inc: () => void;
  dec: () => void;
}

const Paginate = ({ page, inc, dec, totalPages }: PaginateProps) => {
  return (
    <div className={css["paginate"]}>
      <button disabled={page === 1} onClick={dec}>
        Prev
      </button>
      <p>{page}</p>
      <button disabled={page === totalPages} onClick={inc}>
        Next
      </button>
    </div>
  );
};

export default Paginate;
