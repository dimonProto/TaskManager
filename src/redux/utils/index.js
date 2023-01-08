export const withSection = (state, action, callback) => {
	callback(state.sections.findById(action.payload.sectionId));
};

export const withTask = (state, action, callback) => {
	const section = state.sections.findById(action.payload.sectionId);
	callback(section && section.tasks.findById(action.payload.taskId));
};
