import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';
import { IDeskWithColumns } from '../../types/types.tsx';


const initialState: IDeskWithColumns = {
  _id: "",
  name: "",
  users: [],
  position: 0,
  columns: []
}

export const deskSlice = createSlice({
  name: 'desk',
  initialState,
  reducers: {
    setDesk: (state, action:  PayloadAction<IDeskWithColumns>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.users = action.payload.users;
      state.position = action.payload.position;
      state.columns = action.payload.columns;
    }
  }
})


export const { setDesk } = deskSlice.actions;
export const selectDesk = (state: RootState) => state.desk;
export default deskSlice.reducer;