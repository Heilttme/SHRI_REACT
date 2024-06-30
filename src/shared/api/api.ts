import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CurFilmType, FetchFilmsConfig, FilmType } from "entities/types";
import { AuthorizeType, FetchFilmsParams, PutRating } from "./types";

axios.defaults.baseURL = "http://localhost:3030";

export const fetchFilms = createAsyncThunk<
  FilmType[],
  FetchFilmsParams,
  FetchFilmsConfig
>(
  "films/fetchFilms",
  async ({ title, page, genre, release_year }: FetchFilmsParams) => {
    const params: FetchFilmsParams = { page };
    if (title) params.title = title;
    if (genre !== "0" && genre) params.genre = genre;
    if (release_year !== "0" && release_year)
      params.release_year = release_year;

    const response = await axios.get("/api/v1/search", {
      params,
    });

    return response.data;
  }
);

export const getFilmById = createAsyncThunk<
  CurFilmType,
  number,
  FetchFilmsConfig
>("films/getFilmById", async (id: number) => {
  const response = await axios.get(`/api/v1/movie/${id}`);
  return response.data;
});

export const authorize = createAsyncThunk<
  { token: string },
  AuthorizeType,
  FetchFilmsConfig
>("user/authorize", async ({ login, password }: AuthorizeType) => {
  const response = await axios.post("/api/v1/login", {
    username: login,
    password,
  });

  return response.data;
});

export const putRating = createAsyncThunk<
  CurFilmType,
  PutRating,
  FetchFilmsConfig
>("", async ({ id, user_rate, token }: PutRating) => {
  
  const response = await axios.post(
    `/api/v1/rateMovie`,
    {
      movieId: id,
      user_rate,
    },
    {
      headers: {
        "Authorization": token,
      },
    }
  );
  
  return response.data;
});
