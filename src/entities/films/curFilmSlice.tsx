import { createSlice } from "@reduxjs/toolkit";
import { getFilmById } from "@shared/api";
import { statuses } from "../types";
import { StoreType } from "@app/types";

const curFilmSlice = createSlice({
  name: "curFilm",
  initialState: {
    curFilm: {},
    status: "idle",
  },
  reducers: {
    resetFilmState: () => ({
      curFilm: {},
      status: "idle",
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilmById.pending, (state: StoreType["curFilm"]) => {
        state.status = statuses.PENDING;
      })
      .addCase(
        getFilmById.fulfilled,
        (
          state: StoreType["curFilm"],
          action: { payload: StoreType["curFilm"]["curFilm"] }
        ) => {
          state.status = statuses.FULFILLED;
          state.curFilm = action.payload;
        }
      )
      .addCase(getFilmById.rejected, (state) => {
        state.status = statuses.REJECTED;
      });
  },
});

export const { resetFilmState } = curFilmSlice.actions;
export default curFilmSlice.reducer;
