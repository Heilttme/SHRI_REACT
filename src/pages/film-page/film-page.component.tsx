import { StoreType } from "@app/types";
import Rating from "@pages/films-lib-page/ui/rating";
import { getFilmById } from "@shared/api";
import { resetFilmState } from "entities/films/curFilmSlice";
import { CurFilmType, statuses } from "entities/types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { UnknownAction } from "redux";

const FilmPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const status = useSelector((state: StoreType) => state.curFilm.status);
  const film = useSelector(
    (state: { curFilm: { curFilm: CurFilmType } }) => state.curFilm.curFilm
  );

  useEffect(() => {
    dispatch(getFilmById(parseInt(id || "")) as unknown as UnknownAction);

    return () => {
      dispatch(resetFilmState());
    };
  }, [id, dispatch]);

  if (status === statuses.PENDING) {
    return <div>Loading...</div>;
  }

  if (!film.title) {
    return <div>NO FILM FOUND</div>;
  }

  return (
    <div className="p-6">
      <div className="flex bg-white rounded-lg p-4 gap-8 relative">
        <Rating movieId={film.id} className="top-8 right-8" rating={film.rating} />
        <img className="w-96 rounded-lg object-cover" src={film.poster} />
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl mb-4">{film.title}</h1>
          <div className="flex gap-2">
            <strong>Жанр:</strong>
            <p className="capitalize">{film.genre}</p>
          </div>
          <div className="flex gap-2">
            <strong>Год выпуска:</strong>
            <p>{film.release_year}</p>
          </div>
          <div className="flex gap-2">
            <strong>Рейтинг:</strong>
            <p>{film.rating}</p>
          </div>
          <div>
            <strong>Описание</strong>
            <p className="mt-2">{film.description}</p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden mt-4">
        <h1 className="text-2xl mb-1">Актёры</h1>
        <div className="flex overflow-auto gap-4">
          {film.actors.map((actor) => (
            <>
              <div className="min-w-44">
                <img
                  className="min-w-44 h-52 object-cover rounded-xl"
                  src={actor.photo}
                />
                <h2 className="mt-2">{actor.name}</h2>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
