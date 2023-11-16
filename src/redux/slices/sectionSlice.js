import { createSlice } from '@reduxjs/toolkit';
import '../../utils/helpers/index';
import { uid } from 'uid';
import { withSection, withSubTask, withTask } from '../utils';

const initialState = {
	sections: [],
	activeTask: null,
	startYPosition: 0
};

export const sectionSlice = createSlice({
	name: 'sections',
	initialState,
	reducers: {
		addSection: (state, action) => {
			state.sections.push(action.payload);
		},
		createTask: (state, action) => {
			return withSection(state, action, (section) => {
				section.tasks.push({
					id: uid(),
					name: 'New task',
					completed: false,
					description: '',
					subTasks: []
				});
			});
		},
		moveTask: (state, { payload }) => {
			const { oldSectionId, newSectionId, task } = payload;

			const oldSection = state.sections.findById(oldSectionId);
			const newSection = state.sections.findById(newSectionId);

			const cut = oldSection.tasks.splice(task.oldPosition, 1)[0];
			newSection.tasks.splice(task.newPosition, 0, cut);
		},
		moveSection: (state, { payload }) => {
			const { section } = payload;
			const cut = state.sections.splice(section.oldPosition, 1)[0];
			state.sections.splice(section.newPosition, 0, cut);
		},
		changeSectionProperty: (state, action) => {
			return withSection(state, action, (section) => {
				section[action.payload.property] = action.payload.value;
			});
		},
		deleteSection: (state, action) => {
			state.sections = state.sections.removeById(action.payload);
		},
		deleteTask: (state, action) => {
			return withSection(state, action, (section) => {
				section.tasks = section.tasks.removeById(action.payload.taskId);
			});
		},

		setTaskPosition: (state, action) => {
			return withTask(state, action, (task) => {
				task.x = action.payload.x;
				task.y = action.payload.y;
			});
		},
		changeTaskProperty: (state, action) => {
			return withTask(state, action, (task) => {
				const { value, property } = action.payload;
				task[property] = value;
			});
		},
		setStartPositionYTask: (state) => {
			if (!state.startYPosition) {
				state.startYPosition = state.sections.find(
					(section) => section.tasks.length > 0
				).tasks[0]?.y;
			}
		},
		changeTaskProperties: (state, action) => {
			return withTask(state, action, (task) => {
				sectionSlice.caseReducers.setStartPositionYTask(state);
				const { value, property } = action.payload;
				for (let i = 0; i < property.length; i++) {
					task[property[i]] = value[i];
				}
			});
		},
		addSubTask: (state, action) => {
			return withTask(state, action, (task) => {
				task.subTasks = [
					{ id: uid(), description: '', completed: false },
					...task.subTasks
				];
			});
		},
		deleteSubTask: (state, action) => {
			return withTask(state, action, (task) => {
				task.subTasks = task.subTasks.removeById(
					action.payload.subTaskId
				);
			});
		},
		changeSubTaskProperty: (state, action) => {
			return withSubTask(state, action, (subTask) => {
				const { value, property } = action.payload;
				subTask[property] = value;
			});
		},
		setActiveTask: (state, action) => {
			state.activeTask = action.payload;
		}
	}
});

export const sectionReducer = sectionSlice.reducer;
export const sectionActions = sectionSlice.actions;
