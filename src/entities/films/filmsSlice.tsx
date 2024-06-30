import { createSlice } from "@reduxjs/toolkit";
import { statuses } from "../types";
import { fetchFilms } from "@shared/api";
import { StoreType } from "@app/types";

const filmsSlice = createSlice({
  name: "films",
  initialState: {
    films: {
      search_result: [],
      total_pages: 0
    },
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state: StoreType["films"]) => {
        state.status = statuses.PENDING;
      })
      .addCase(fetchFilms.fulfilled, (state: StoreType["films"], action: {payload: StoreType["films"]["films"]}) => {
        state.status = statuses.FULFILLED;
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.status = statuses.REJECTED;
      });
  },
});

export default filmsSlice.reducer;
