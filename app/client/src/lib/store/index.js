/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profile/profileSlice';
import authReducer from './features/auth/authSlice';
import authModalReducer from './features/auth-modal/authModalSlice';

export const makeStore = () =>
	configureStore({
		reducer: {
			profile: profileReducer,
			auth: authReducer,
			authModal: authModalReducer
		},
		middleware: getDefaultMiddleware => getDefaultMiddleware()
	});
