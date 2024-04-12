/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profile/profileSlice';

export const makeStore = () =>
	configureStore({
		reducer: profileReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware()
	});
