/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateUser: (state, action) => {
			state.user = action.payload.user;
		}
	}
});

export const { updateUser } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
