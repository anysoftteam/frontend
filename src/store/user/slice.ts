import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from 'src/common/enums/app/role.enum';
import { StorageKey } from 'src/common/enums/storage-key.enum';
import { RootState } from 'src/store';

interface UserState {
  userId: number | null;
  role: UserRole | null;
}

type UserContent = UserState;

const defaultlState: UserState = {
  userId: null,
  role: null,
};

const getState = (): UserState => {
  const jsonRes = localStorage.getItem(StorageKey.USER);
  const res = (
    typeof jsonRes === 'string' ? JSON.parse(jsonRes) : defaultlState
  ) as UserState;
  return { ...res };
};

const initialState: UserState = getState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserContent>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
  },
});

export const getUser = (state: RootState) => state.user;

export const userActions = userSlice.actions;

export const userReduser = userSlice.reducer;
