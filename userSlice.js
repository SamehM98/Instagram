import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: ''
  },
  reducers: {
    signin: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    }
  }
})

export const { signin } = userSlice.actions;

export const selectUser = state => state.user.value;

export default userSlice.reducer;