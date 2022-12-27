import { createSlice } from '@reduxjs/toolkit';
import { uid } from 'uid';
import '../../utils/helpers/index';

const initialState = {
	sections: [],
	activeTask: null
};

export const sectionSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		addSection: (state, action) => {
			state.sections.push(action.payload);
		},
		createTask: (state, action) => {
			const targetSection = state.sections.findById(
				action.payload.sectionId
			);
			targetSection.tasks.push({
				id: uid(),
				name: 'New task'
			});
		},
		moveTask: (state, { payload }) => {
			const { oldSectionId, newSectionId, task } = payload;

			const oldSection = state.sections.findById(oldSectionId);
			const newSection = state.sections.findById(newSectionId);

			const cut = oldSection.tasks.splice(task.oldPosition, 1)[0];
			newSection.tasks.splice(task.newPosition, 0, cut);
		},
		changeSectionName: (state, action) => {
			const targetSection = state.sections.find(
				(el) => el.id === action.payload.sectionId
			);
			targetSection.name = action.payload.newName;
		},
		changeTaskName: (state, action) => {
			const findSection = state.sections.findById(
				action.payload.sectionId
			);

			findSection.tasks.map((task) => {
				if (task.id === action.payload.taskId) {
					task.name = action.payload.taskName;
				}
			});
		},
		changeColorSection: (state, action) => {
			state.sections.map((el) => {
				if (el.id === action.payload.sectionId) {
					el.color = action.payload.sectionColor;
				}
			});
		},
		deleteSection: (state, action) => {
			state.sections = state.sections.filter(
				(section) => section.id !== action.payload
			);
		},
		deleteTask: (state, action) => {
			const findSection = state.sections.findById(
				action.payload.sectionId
			);

			findSection.tasks = findSection.tasks.filter(
				(task) => task.id !== action.payload.taskId
			);
		},
		setTaskPosition: (state, action) => {
			const findSection = state.sections.findById(
				action.payload.sectionId
			);
			findSection.tasks.map((el) => {
				if (el.id === action.payload.taskId) {
					el.x = action.payload.x;
					el.y = action.payload.y;
				}
			});
		},
		setActiveTask: (state, action) => {
			state.activeTask = action.payload;
		}
	}
});

export const sectionReducer = sectionSlice.reducer;
export const sectionActions = sectionSlice.actions;
