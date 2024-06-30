import React, { useState } from "react";
import GrayStar from "@assets/GrayStar.tsx";
import FilledStar from "@assets/FilledStar.tsx";
import EmptyStar from "@assets/EmptyStar.tsx";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { getFilmById, putRating } from "@shared/api";

const Rating = ({
  movieId,
  rating,
  className,
  disabled = false,
}: {
  movieId: number;
  rating: number;
  className?: string;
  disabled?: boolean;
}) => {
  const [hovered, setHovered] = useState<number>(0);
  const dispatch = useDispatch();

  const setRating = (ind: number) => {
    dispatch(
      putRating({
        id: movieId,
        user_rate: ind + 1,
        token: localStorage.getItem("token"),
      })
    );
    dispatch(getFilmById(movieId));
  };

  return (
    <div className={clsx("flex absolute right-2 top-2", className)}>
      <div className="flex">
        {Array(5)
          .fill(<></>)
          .map((_, ind) => (
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => !disabled && setHovered(ind + 1)}
              onMouseLeave={() => !disabled && setHovered(0)}
            >
              <div onClick={() => !disabled && setRating(ind)}>
                {hovered > ind ? (
                  <GrayStar />
                ) : rating >= ind + 1 && !hovered ? (
                  <FilledStar />
                ) : (
                  <EmptyStar />
                )}
              </div>
              <p className="absolute -bottom-5 text-sm left-1/2 -translate-x-1/2">
                {ind + 1}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Rating;
