import { StoreType } from "@app/types";
import { fetchFilms } from "@shared/api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBlock from "./ui/filter-block";
import FilmsBlock from "./ui/films-block";
import { useDebouncedValue } from "@mantine/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UnknownAction } from "redux";

const FilmsLibPage = () => {
  const dispatch = useDispatch();
  const films = useSelector((state: StoreType) => state.films.films);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebouncedValue(inputValue, 400);
  const [page, setPage] = useState(1);
  const [debouncedPageValue] = useDebouncedValue(page, 400);
  const [genre, setGenre] = useState("");
  const [release_year, setYear] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const updateSearchParams = () => {
    const params = new URLSearchParams(searchParams);
    if (genre) {
      params.set("genre", genre);
    } else {
      params.delete("genre");
    }
    if (release_year) {
      params.set("release_year", release_year);
    } else {
      params.delete("release_year");
    }
    navigate({ search: params.toString() });
  };

  useEffect(() => {
    updateSearchParams();
  }, [genre, release_year]);

  useEffect(() => {
    const newGenre = searchParams.get("genre");
    const newRelease_year = searchParams.get("release_year");

    if (newGenre) setGenre(newGenre);
    if (newRelease_year) setYear(newRelease_year);
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(
      fetchFilms({
        title: debouncedInputValue,
        page: debouncedPageValue,
        release_year,
        genre,
      }) as unknown as UnknownAction
    ); 
  }, [release_year, debouncedInputValue, debouncedPageValue, genre, dispatch]);


  return (
    <div className="flex p-4 gap-8">
      <FilterBlock
        setGenre={setGenre}
        setYear={setYear}
        release_year={release_year}
        genre={genre}
      />
      <FilmsBlock
        inputValue={inputValue}
        setInputValue={setInputValue}
        page={page}
        setPage={setPage}
        films={films}
      />
    </div>
  );
};

export default FilmsLibPage;
