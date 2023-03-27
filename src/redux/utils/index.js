export const withSection = (state, action, callback) => {
	callback(state.sections.findById(action.payload.sectionId));
};

export const withTask = (state, action, callback) => {
	const section = state.sections.findById(action.payload.sectionId);
	callback(section && section.tasks.findById(action.payload.taskId));
};
export const withSubTask = (state, action, callback) => {
	const section = state.sections.findById(action.payload.sectionId);
	const task = section && section.tasks.findById(action.payload.taskId);
	callback(task && task.subTasks.findById(action.payload.subTaskId));
};
