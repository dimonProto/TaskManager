import { createSlice } from '@reduxjs/toolkit';
import '../../utils/helpers/index';

const initialState = {
	activeModal: false
};

export const sectionSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		toggleModal: (state, action) => {
			state.activeModal = action.payload;
		}
	}
});

export const appReducer = sectionSlice.reducer;
export const appActions = sectionSlice.actions;
