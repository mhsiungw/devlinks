/* eslint-disable import/prefer-default-export */
import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices();

export const makeStore = () => configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware()
});
