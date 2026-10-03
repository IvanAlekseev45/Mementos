import { type ChangeEvent } from "react";
import type { DateSort, Season, SeasonCategory, SeasonCount } from "../../types/memories";
import css from "./FilterSection.module.css";

interface FilterSectionProps {
  seasons?: Season[];
  totalItems?: number;
  infoSeason: (q: SeasonCategory) => void;
  seasonCount: SeasonCount[];
  onSortSubmit: (q: DateSort) => void;
  dateSort: DateSort;
}

const FilterSection = ({ totalItems, infoSeason, seasonCount, onSortSubmit, dateSort }: FilterSectionProps) => {
  const sortHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentSortValue = e.target.value;
    onSortSubmit(currentSortValue as DateSort);
  };
  return (
    <div className={css["filter"]}>
      <div className={css["filter-seasons"]}>
        <button onClick={() => infoSeason("")}>All Seasons ({totalItems})</button>
        <button onClick={() => infoSeason("summer")}>
          ☀️ Summer (
          {seasonCount.map((el) => {
            if (el.season === "summer") {
              return el.count;
            }
          })}
          )
        </button>
        <button onClick={() => infoSeason("spring")}>
          🌸 Spring (
          {seasonCount.map((el) => {
            if (el.season === "spring") {
              return el.count;
            }
          })}
          )
        </button>
        <button onClick={() => infoSeason("autumn")}>
          🍂 Autumn (
          {seasonCount.map((el) => {
            if (el.season === "autumn") {
              return el.count;
            }
          })}
          )
        </button>
        <button onClick={() => infoSeason("winter")}>
          ❄️ Winter (
          {seasonCount.map((el) => {
            if (el.season === "winter") {
              return el.count;
            }
          })}
          )
        </button>
      </div>
      <label className={css["sort-label"]}>
        <span> Sort:</span>
        <select name="sortOrder" onChange={sortHandler} value={dateSort}>
          <option value="">Recently added </option>
          <option value="desc">Newer by date</option>
          <option value="asc">Older by date</option>
        </select>
      </label>
    </div>
  );
};

export default FilterSection;
