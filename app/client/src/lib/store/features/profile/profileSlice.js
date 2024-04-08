/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tab: 'edit-link'
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		toggle: state => {
			state.tab = state.tab === 'edit-link' ? 'edit-detail' : 'edit-link';
		}
	}
});

export const { toggle } = profileSlice.actions;

const profileReducer = profileSlice.reducer;

export default profileReducer;
