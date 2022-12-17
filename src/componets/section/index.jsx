import React, { useState } from 'react';
import { ReactComponent as Plus } from '../../images/icons/plus.svg';
import SectionContextModal from '../modal/sectionModal';
import TaskList from '../taskList';
import { useAction } from '../../hooks/useAction';

const Section = ({
	addTask,
	section,
	changeName,
	newPositionTask,
	...props
}) => {
	const { createTask } = useAction();
	const [showSectionModal, setSectionModal] = useState(false);
	const [showTaskModal, setTaskModal] = useState(false);
	const [cursorPosition, setCursorPosition] = useState({
		pageX: 0,
		pageY: 0
	});
	const [taskId, setTaskId] = useState('');
	const [taskName, setTaskName] = useState('');

	const handleModal = (e, taskId) => {
		e.preventDefault();

		if (e.nativeEvent.button === 2) {
			setCursorPosition({
				pageX: e.pageX,
				pageY: e.pageY
			});

			if (taskId) {
				toggleTaskModal(taskId);
			} else {
				toggleSectionModal();
			}
		}
	};

	const toggleSectionModal = () => setSectionModal(!showSectionModal);
	const toggleTaskModal = () => setTaskModal(!showTaskModal);

	const handleAddTask = () => {
		createTask({ sectionId: section.id });
		toggleSectionModal();
	};

	const rightClickSection = (e, taskId) => {
		handleModal(e, taskId);
	};

	const rightClickTask = (e, taskId, name) => {
		e.stopPropagation();
		rightClickSection(e, taskId);
		setTaskId(taskId);
		setTaskName(name);
	};

	return (
		<>
			<div
				className="section"
				onContextMenu={(e) => rightClickSection(e)}
			>
				<div className="section--header">
					<div
						className="section--input"
						style={{ backgroundColor: `${section.color}` }}
					>
						<input
							type="text"
							placeholder="Section label"
							value={section.name}
							onChange={(e) => changeName(e.target.value)}
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
					toggleTaskModal={toggleTaskModal}
					showTaskModal={showTaskModal}
					cursorPosition={cursorPosition}
					taskId={taskId}
					taskName={taskName}
					setTaskName={setTaskName}
					{...props}
				/>
			</div>
			{showSectionModal && (
				<SectionContextModal
					onClick={toggleSectionModal}
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
