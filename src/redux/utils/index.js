export const withSection = (state, action, callback) => {
	callback(state.sections.findById(action.payload.sectionId));
};
