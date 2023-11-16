import { useSelector } from 'react-redux';

export const useActiveTask = () => {
	const sectionsBlocks = useSelector((state) => state.section.sections);
	const activeTask = useSelector((state) => state.section.activeTask);

	const findSection = sectionsBlocks.find(
		(el) => activeTask && el.id === activeTask.sectionId
	);

	return findSection?.tasks.find(
		(el) => activeTask && el.id === activeTask.taskId
	);
};
