import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUsers: null,
  },
  reducers: {
    //actions
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUsers = action.payload;
    },
  },
});
export const {
  setAuthUser,
  setSelectedUser,
  setSuggestedUsers,
  setUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
