import { createSlice } from "@reduxjs/toolkit";
import { statuses } from "../types";
import { authorize } from "@shared/api";

interface AuthorisationType {
  authorised: boolean;
  status: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    authorised: false,
    status: "idle",
  },
  reducers: {
    authorizeAction: () => ({ authorised: true, status: statuses.FULFILLED }),
    logout: () => ({ authorised: false, status: statuses.IDLE })
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorize.pending, (state: AuthorisationType) => {
        state.status = statuses.PENDING;
      })
      .addCase(
        authorize.fulfilled,
        (state: AuthorisationType, action: { payload: { token: string } }) => {
          state.status = statuses.FULFILLED;
          state.authorised = true;
          localStorage.setItem("token", `Bearer ${action.payload.token}`);
        }
      )
      .addCase(authorize.rejected, (state: AuthorisationType) => {
        state.status = statuses.REJECTED;
      });
  },
});

export const { authorizeAction, logout } = userSlice.actions

export default userSlice.reducer;
