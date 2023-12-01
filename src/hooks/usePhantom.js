import React, { useRef, useState } from 'react';
import { SECTION_GAP, TASK_GAP, WIDTH_SECTION } from '../utils/constant';
import Task from '../componets/taskList/task';

export const usePhantom = () => {
	const [phantomTask, setPhantomTask] = useState(null);

	const phantomRef = useRef();

	const setPositionPhantom = (left, top) => {
		if (!phantomRef) return null;
		phantomRef.current.style.left = left + 'px';
		phantomRef.current.style.top = top + 'px';
	};

	const handlePhantomPosition = (
		hoveredTask,
		isEmptySection,
		zeroY,
		lastTask,
		idxSection,
		isGoAway
	) => {
		if (hoveredTask) {
			setPositionPhantom(hoveredTask.x, hoveredTask.y);
		}

		if (!hoveredTask && !isEmptySection) {
			if (phantomTask.id === lastTask.id && !isGoAway) return;

			const phantomPositionY = isGoAway
				? lastTask.y
				: lastTask.y + lastTask.height + TASK_GAP;
			setPositionPhantom(lastTask.x, phantomPositionY);
		}

		if (!hoveredTask && isEmptySection) {
			const zeroX = WIDTH_SECTION * idxSection + SECTION_GAP * 2;
			setPositionPhantom(zeroX, zeroY);
		}
	};
	const clearPhantom = () => {
		setPhantomTask(null);
	};
	const initPhantom = (task, position) => {
		setPositionPhantom(position);
		setPhantomTask(task);
	};
	const PhantomJSX = () => {
		return (
			<span ref={phantomRef} className="phantom">
				<Task
					task={phantomTask && phantomTask}
					handleTaskPosition={() => {}}
				/>
			</span>
		);
	};

	return { PhantomJSX, handlePhantomPosition, clearPhantom, initPhantom };
};
