/* eslint-disable import/prefer-default-export */
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profile/profileSlice';

const rootReducer = combineSlices();

export const makeStore = () =>
	configureStore({
		reducer: profileReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware()
	});
