import { type ChangeEvent } from "react";
import type { Season, SeasonCategory, SeasonCount } from "../../types/memories";
import css from "./FilterSection.module.css";

interface FilterSectionProps {
  seasons?: Season[];
  totalItems?: number;
  infoSeason: (q: SeasonCategory) => void;
  seasonCount: SeasonCount[];
  onSortSubmit: (q: "asc" | "desc") => void;
  sortOrder: "asc" | "desc";
}

const FilterSection = ({
  totalItems,
  infoSeason,
  seasonCount,
  onSortSubmit,
  sortOrder,
}: FilterSectionProps) => {
  const sortHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentSortValue = e.target.value;
    onSortSubmit(currentSortValue as "asc" | "desc");
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
      <label>
        <span> Sort by date:</span>
        <select name="sortOrder" onChange={sortHandler} value={sortOrder}>
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </label>
    </div>
  );
};

export default FilterSection;
