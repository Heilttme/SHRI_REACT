import React from "react";
import FilmsLibPage from "@pages/films-lib-page/films-lib-page.component";
import { Route, Routes } from "react-router";
import FilmPage from "@pages/film-page/film-page.component";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/films" element={<FilmsLibPage />} />
      <Route path="/films/:id" element={<FilmPage />} />
      <Route path="*" element={<>404 not found</>} />
    </Routes>
  );
};

export default AppRouter;
