import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';
import { IUser } from '../../types/types.tsx';


const initialState: IUser = {
  _id: "",
  name: "",
  email: "",
  password: "",
  image: "",
  desks: []
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action:  PayloadAction<IUser>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.image = action.payload.image;
      state.desks = action.payload.desks;
    }
  }
})


export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;