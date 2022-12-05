import React, { useEffect, useRef } from 'react';

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
	const currentTask = useRef();

	useEffect(() => {
		if (!currentTask || !currentTask.current) return;
		handleTaskPosition(currentTask.current);
	}, [currentTask]);
	if (!task) return;

	return (
		<li
			className="task"
			ref={currentTask}
			style={section && { borderColor: `${section.color}` }}
			draggable
			onDragStart={(e) =>
				startHandler(e, task, section.id, idx, currentTask.current)
			}
			onDrag={(e) => dragHandler(e)}
			onDragEnd={(e) => endHandler(e, currentTask.current)}
			color={color}
			onContextMenu={(e) => rightClickTask(e, task.id, task.name)}
			key={task.id}
		>
			{task.name}
		</li>
	);
};

export default Task;
