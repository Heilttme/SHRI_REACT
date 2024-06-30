// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from "../entities/films/filmsSlice"
import curFilmReducer from "../entities/films/curFilmSlice"
import userReducer from "../entities/user/userSlice"

const store = configureStore({
  reducer: {
    films: filmsReducer,
    curFilm: curFilmReducer,
    user: userReducer
  }
});

export default store;
