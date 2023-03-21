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
	return (
		<>
			<li
				className="task"
				ref={currentTaskRef}
				style={section && { borderColor: `${section.color}` }}
				onClick={() => setActiveTask({ task, sectionId: section.id })}
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
				{task.name}
				{task && task.completed && (
					<div>
						<Agree className="greenAgree" />
					</div>
				)}
			</li>
		</>
	);
};

export default Task;
