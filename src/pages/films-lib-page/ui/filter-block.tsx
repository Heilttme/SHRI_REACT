import { Select } from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";
import { GENRES, YEARS } from "../lib";
import DropdownArrow from "@assets/DropdownArrow";

interface FilterBlockTypes {
  genre: string;
  setGenre: Dispatch<SetStateAction<string>>;
  release_year: string;
  setYear: Dispatch<SetStateAction<string>>;
}

const FilterBlock = ({
  genre,
  setGenre,
  release_year,
  setYear,
}: FilterBlockTypes) => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg w-1/5 self-start">
      <h2>Фильтр</h2>
      <div>
        <h3>Жанр</h3>
        <Select
          placeholder="Выберите жанр"
          className="outline-none border-none"
          classNames={{ input: "border-gray-300" }}
          data={Object.entries(GENRES).map((o) => ({
            value: o[0],
            label: o[1],
          }))}
          rightSection={<DropdownArrow />}
          value={genre}
          onChange={(value) => setGenre(value || "")}
        />
      </div>
      <div>
        <h3>Год выпуска</h3>
        <Select
          placeholder="Выберите год"
          className="outline-none border-none"
          classNames={{ input: "border-gray-300" }}
          data={Object.entries(YEARS).map((o) => ({
            value: o[0],
            label: o[1],
          }))}
          rightSection={<DropdownArrow />}
          value={release_year}
          onChange={(value) => setYear(value || "")}
        />
      </div>
    </div>
  );
};

export default FilterBlock;
