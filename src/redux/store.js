import { configureStore } from '@reduxjs/toolkit';
import { sectionReducer } from './slices/sectionSlice';
import { appReducer } from './slices/appSlice';

export const store = configureStore({
	reducer: {
		section: sectionReducer,
		modal: appReducer,
		middleware: {
			immutableCheck: false
		}
	}
});
