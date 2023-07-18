import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import moviesSlice from './slices/moviesSlice';
import { moviesApi } from './services/moviesApi';

const store = configureStore({
	reducer: {
		movies: moviesSlice.reducer,
		[moviesApi.reducerPath]: moviesApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
});

export default store;

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
