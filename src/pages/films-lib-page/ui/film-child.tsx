import { FilmType } from "entities/types";
import React from "react";
import Rating from "./rating";
import { Link } from "react-router-dom";

const FilmChild = ({ film }: { film: FilmType }) => {
  return (
    <Link
      to={`/films/${film.id}`}
      className="w-full bg-white flex p-4 rounded-lg relative cursor-pointer"
    >
      <div className="flex gap-4">
        <img
          className="min-w-28 h-40 object-cover rounded-lg"
          src={film.poster}
          alt={`poster ${film.title}`}
        />
        <div className="flex flex-col">
          <h1 className="font-bold text-xl mb-4">{film.title}</h1>
          <div className="flex gap-8 w-3/4">
            <div className="flex flex-col gap-2 whitespace-nowrap text-gray-400">
              <p>Жанр</p>
              <p>Год выпуска</p>
              <p>Описание</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>{film.genre}</p>
              <p>{film.release_year}</p>
              <p>{film.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Rating movieId={film.id} disabled rating={film.rating} />
    </Link>
  );
};

export default FilmChild;
