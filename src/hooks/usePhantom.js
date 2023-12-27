import React, { useRef, useState } from 'react';
import { SECTION_GAP, TASK_GAP, WIDTH_SECTION } from '../utils/constant';
import Task from '../componets/taskList/task';

export const usePhantom = () => {
	const [phantomTask, setPhantomTask] = useState(null);
	const [phantomSection, setPhantomSection] = useState(null);

	const phantomRef = useRef();

	const setPositionPhantom = (left, top) => {
		if (!phantomRef) return null;
		if (phantomTask) {
			phantomRef.current.style.left = left + 'px';
			phantomRef.current.style.top = top + 'px';
		}

		if (phantomSection) {
			phantomRef.current.style.left = left + 'px';
			phantomRef.current.style.top = top + 'px';
		}
	};

	const handlePhantomPosition = (
		hoveredTask,
		isEmptySection,
		zeroY,
		lastTask,
		idxSection,
		isGoAway
	) => {
		if (phantomTask) {
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
		}
		if (phantomSection) {
			setPositionPhantom(phantomSection.x, phantomSection.y);
		}
	};
	const clearPhantom = () => {
		setPhantomTask(null);
		setPhantomSection(null);
	};
	const initPhantom = (element, phantomElem, position) => {
		if (element === 'task') {
			setPositionPhantom(position);
			setPhantomTask(phantomElem);
		}
		if (element === 'section') {
			setPositionPhantom(position);
			setPhantomSection(phantomElem);
		}
	};

	const PhantomJSX = () => {
		return (
			<>
				{phantomTask && (
					<span ref={phantomRef} className="phantom">
						<Task
							task={phantomTask && phantomTask}
							handleTaskPosition={() => {}}
						/>
					</span>
				)}
				{phantomSection && (
					<span
						ref={phantomRef}
						className="phantom"
						style={{ height: '100%' }}
					>
						<div
							className="add--section"
							style={{ height: '100%' }}
						></div>
					</span>
				)}
			</>
		);
	};

	return { PhantomJSX, handlePhantomPosition, clearPhantom, initPhantom };
};
