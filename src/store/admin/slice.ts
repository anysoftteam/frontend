import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/interfaces/services/models/User';
import { RootState } from 'src/store';

interface AdminState {
  admins: User[];
  page: number;
  count: number;
  totalPages: number;
  totalCount: number;
}

const initialState: AdminState = {
  admins: [],
  page: 1,
  count: 10,
  totalPages: 1,
  totalCount: 0,
};

type AdminContent = AdminState;

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmins: (state, action: PayloadAction<AdminContent>) => {
      state = action.payload;
    },
  },
});

export const loadAdmins = (state: RootState) => state.admin;

export const adminActions = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
