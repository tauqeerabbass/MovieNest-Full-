import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: null,
    email: null,
    displayName: null,
    role: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.role = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
