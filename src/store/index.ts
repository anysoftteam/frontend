import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { uiReducer } from 'src/store/ui/slice';
import { userReduser } from 'src/store/user/slice';
import { registryReducer } from 'src/store/registry/slice';
import { registrarReducer } from 'src/store/registrator/slice';
import { adminReducer } from 'src/store/admin/slice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReduser,
    registry: registryReducer,
    registrar: registrarReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
