import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryRec } from 'src/interfaces/services/models/HistoryRec';
import { DocRecord } from 'src/interfaces/services/models/Record';
import { RootState } from 'src/store';

interface DocState {
  records: DocRecord[];
  page: number;
  count: number;
  totalPages: number;
  totalCount: number;
}

interface HistoryState {
  docId: number;
  history: HistoryRec[];
  page: number;
  count: number;
  totalPages: number;
  totalCount: number;
}

interface RegistryState {
  doc: DocState;
  history: HistoryState | null;
}

const initialState: RegistryState = {
  doc: { records: [], page: 1, count: 10, totalPages: 1, totalCount: 0 },
  history: null,
};

const registrySlice = createSlice({
  name: 'registry',
  initialState,
  reducers: {
    setRegistries: (state, action: PayloadAction<DocState>) => {
      console.log(action.payload);

      state.doc = action.payload;
    },
    setHistory: (state, action: PayloadAction<HistoryState>) => {
      state.history = action.payload;
    },
  },
});

export const loadRegistry = (state: RootState) => state.registry;

export const registryActions = registrySlice.actions;

export const registryReducer = registrySlice.reducer;
