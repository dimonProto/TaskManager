import React, { useState } from 'react';
import { ReactComponent as Plus } from '../../images/icons/plus.svg';
import SectionContextModal from '../modal/sectionModal';
import TaskList from '../taskList';
import { useAction } from '../../hooks/useAction';
import { useToggle } from '../../hooks/useToggle';
import { useContextMenu } from '../../hooks/useContextMenu';
import DebounceInput from '../debounceInput';

const Section = ({
	addTask,
	section,
	changeName,
	newPositionTask,
	startSectionHandler,
	endSectionHandler,
	idxPositionSection,
	...props
}) => {
	const { createTask } = useAction();
	const [isShowSectionModal, setIsShowSectionModal] = useToggle();

	const [cursorPosition, handleModal] = useContextMenu();
	const [isShowTaskModal, setIsShowTaskModal] = useToggle();
	const [taskId, setTaskId] = useState('');
	const [taskName, setTaskName] = useState('');

	const handleAddTask = () => {
		createTask({ sectionId: section.id });
		setIsShowSectionModal();
	};

	const rightClickSection = (e) => {
		handleModal(e, setIsShowSectionModal);
	};

	const rightClickTask = (e, taskId, name) => {
		e.stopPropagation();
		handleModal(e, setIsShowTaskModal);

		setTaskId(taskId);
		setTaskName(name);
	};

	return (
		<>
			<div
				key={section.id}
				className="section"
				draggable
				onDragStart={() => startSectionHandler(idxPositionSection)}
				onDragEnd={(e) => endSectionHandler(e)}
				onContextMenu={rightClickSection}
			>
				<div className="section--header">
					<div
						className="section--input"
						style={{ backgroundColor: `${section.color}` }}
					>
						<DebounceInput
							value={section.name}
							onChange={changeName}
						/>
					</div>
					<div className="button--add" onClick={addTask}>
						<span> Add Task</span>
						<Plus />
					</div>
				</div>
				<TaskList
					section={section}
					rightClickTask={rightClickTask}
					toggleTaskModal={setIsShowTaskModal}
					showTaskModal={isShowTaskModal}
					cursorPosition={cursorPosition}
					taskId={taskId}
					taskName={taskName}
					setTaskName={setTaskName}
					{...props}
				/>
			</div>
			{isShowSectionModal && (
				<SectionContextModal
					onClick={setIsShowSectionModal}
					cursorPosition={cursorPosition}
					addTask={handleAddTask}
					sectionId={section.id}
					color={section.color}
					sectionName={section.name}
					changeName={changeName}
				/>
			)}
		</>
	);
};

export default Section;
