import { StoreType } from "@app/types";
import { Dispatch } from "redux";

export interface FilmType {
  id: number;
  title: string;
  description: string;
  rating: number;
  poster: string;
  genre: string;
  release_year: number;
}

export interface CurFilmType extends FilmType {
  actors: { name: string; photo: string }[];
}

export enum statuses {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
  IDLE = "idle",
}

export interface FilmsStoreType {
  films: StoreType;
  status: string;
}

export interface FetchFilmsConfig {
  state: FilmsStoreType;
  dispatch: Dispatch;
}
