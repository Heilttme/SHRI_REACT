import { FilmType } from "entities/types";
import React, { SetStateAction, Dispatch } from "react";
import FilmChild from "./film-child";
import { Input, Loader } from "@mantine/core";
import Magnifier from "@assets/Magnifier";
import ArrowLeft from "@assets/ArrowLeft";
import ArrowRight from "@assets/ArrowRight";
import { useSelector } from "react-redux";

import { StoreType } from "@app/types";
const FilmsBlock = ({
  films,
  inputValue,
  setInputValue,
  page,
  setPage,
}: {
  films: { search_result: FilmType[]; total_pages: number };
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const status = useSelector((state: StoreType) => state.films.status);

  return (
    <div className="w-4/5">
      {films.search_result.length === 0 ? <div className="w-full h-96 flex items-center justify-center">No films found</div> :
      <div className="flex flex-col gap-4">
        <div>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Название фильма"
            className="w-64"
            classNames={{ input: "focus:border-[#FF5500]" }}
            leftSection={<Magnifier />}
          />
        </div>
        {status === "pending" ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          films.search_result.map((film) => (
            <FilmChild key={film.id} film={film} />
          ))
        )}
      </div>
      }
      <div className="flex gap-1 mt-2">
        <div
          onClick={() => setPage((prev) => (prev - 1 >= 1 ? prev - 1 : 1))}
          className="py-1 px-2 flex justify-center items-center bg-white rounded-full cursor-pointer"
        >
          <ArrowLeft />
        </div>
        <p>{page}</p>
        <div
          onClick={() => setPage((prev) => (prev + 1 >= 5 ? 5 : prev + 1))}
          className="py-1 px-2 flex justify-center items-center bg-white rounded-full cursor-pointer"
        >
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default FilmsBlock;
