import React, { useEffect, useRef } from 'react';
import { useAction } from '../../../hooks/useAction';
import { ReactComponent as Agree } from '../../../images/icons/agree.svg';

const Task = ({
	color,
	section,
	idx,
	task,
	startHandler,
	dragHandler,
	endHandler,
	handleTaskPosition,
	rightClickTask
}) => {
	const currentTaskRef = useRef();

	const { setActiveTask } = useAction();

	useEffect(() => {
		if (!currentTaskRef || !currentTaskRef.current) return;
		handleTaskPosition(currentTaskRef.current);
	}, [currentTaskRef]);
	if (!task) return;

	const calculateProgress = () => {
		if (task.subTasks && task.subTasks.length === 0) return 0;
		const subTaskProportionSize = 100 / task.subTasks.length;
		return (
			task.subTasks.filter((el) => el.completed).length *
			subTaskProportionSize
		);
	};
	return (
		<>
			<li
				className={`task`}
				ref={currentTaskRef}
				style={{
					borderColor: section && section.color
				}}
				onClick={() =>
					setActiveTask({ taskId: task.id, sectionId: section.id })
				}
				draggable
				onDragStart={(e) =>
					startHandler(
						e,
						task,
						section.id,
						idx,
						currentTaskRef.current
					)
				}
				onDrag={(e) => dragHandler(e)}
				onDragEnd={(e) => endHandler(e, currentTaskRef.current)}
				color={color}
				onContextMenu={(e) => rightClickTask(e, task.id, task.name)}
				key={task.id}
			>
				<span className="taskText">
					{' '}
					{task.name}
					{task && task.completed && (
						<div>
							<Agree className="greenAgree" />
						</div>
					)}
				</span>
				<span className="taskSubText">{task.description}</span>
				<div
					className={`absBg greenBg`}
					style={{
						width: +calculateProgress() + '%'
					}}
				></div>
			</li>
		</>
	);
};

export default Task;
