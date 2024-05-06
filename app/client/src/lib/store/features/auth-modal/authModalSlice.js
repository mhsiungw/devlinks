/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	open: false
};

export const authModalSlice = createSlice({
	name: 'authModal',
	initialState,
	reducers: {
		openAuthModal: state => {
			state.open = true;
		},
		closeAuthModal: state => {
			state.open = false;
		}
	}
});

export const { openAuthModal, closeAuthModal } = authModalSlice.actions;

const authModalReducer = authModalSlice.reducer;

export default authModalReducer;
