import { CurFilmType, FilmType } from "entities/types";

export interface StoreType {
  films: {
    films: {
      search_result: FilmType[];
      total_pages: number;
    };
    status: string;
  };
  user: {
    authorised: boolean;
    status: string;
  };
  curFilm: {
      curFilm: CurFilmType,
      status: string,
  }
}
