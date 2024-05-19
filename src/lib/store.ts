import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../lib/slices/authSlice';
import kanbanReducer from '../lib/slices/kanbanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kanban: kanbanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

