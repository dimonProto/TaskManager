import './App.css';
import { useSelector } from 'react-redux';
import Section from './componets/section';
import CreateSection from './componets/addSection';
import Header from './componets/header';
import { useRef, useState } from 'react';
import Task from './componets/taskList/task';
import { useAction } from './hooks/useAction';
import { uid } from 'uid';
import { HEIGHT_TASK, SECTION_GAP, WIDTH_SECTION } from './utils/constant';

function App() {
	const sectionsBlocks = useSelector((state) => state.section.sections);
	const {
		moveTask,
		addSection,
		setTaskPosition,
		createTask,
		changeSectionName
	} = useAction();
	const [oldSectionId, setOldSectionId] = useState(null);
	const [oldTaskPosition, setOldTaskPosition] = useState(null);
	const [phantomTask, setPhantomTask] = useState(null);
	const sectionsRef = useRef();
	const phantomRef = useRef();

	const setPositionPhantom = (left, top) => {
		if (!phantomRef) return null;
		phantomRef.current.style.left = left.toString() + 'px';
		phantomRef.current.style.top = top.toString() + 'px';
	};

	const startHandler = (e, task, sectionId, idx) => {
		const targetElement = e.target;

		setTimeout(() => {
			targetElement.style.visibility = 'hidden';
		}, 10);

		setOldTaskPosition(idx);
		setOldSectionId(sectionId);
		setPositionPhantom(
			targetElement.getBoundingClientRect().left,
			targetElement.getBoundingClientRect().top
		);
		setPhantomTask({ task, isGoAway: false });
	};

	const dragHandler = (e) => {
		e.preventDefault();
		const idxSection = Math.floor(e.pageX / WIDTH_SECTION);
		const taskOrder = currentPositionTask(e);
		const taskList = sectionsBlocks[idxSection]?.tasks;
		if (taskOrder <= 0) return;
		let hoveredTask = taskList[taskOrder - 1];
		setPhantomTask({
			...phantomTask,
			isGoAway: sectionsBlocks[idxSection].id === oldSectionId
		});

		if (hoveredTask) {
			setPositionPhantom(hoveredTask.x, hoveredTask.y);
		}

		if (!hoveredTask && taskList.length > 0) {
			const lastTask = taskList[taskList.length - 1];
			if (phantomTask.id === lastTask.id && !phantomTask.isGoAway) return;

			const phantomPositionY = phantomTask.isGoAway
				? lastTask.y
				: lastTask.y + HEIGHT_TASK;
			setPositionPhantom(lastTask.x, phantomPositionY);
		}

		if (!hoveredTask && taskList.length === 0) {
			const zeroY = sectionsBlocks.find((section) => section.tasks.length > 0)
				.tasks[0].y;
			const zeroX = WIDTH_SECTION * idxSection + SECTION_GAP * 2;
			setPositionPhantom(zeroX, zeroY);
		}
	};

	const currentPositionTask = (e) => {
		const sectionTop =
			sectionsRef && sectionsRef.current.getBoundingClientRect().top;
		return Math.floor((e.pageY - sectionTop) / HEIGHT_TASK);
	};

	const endHandler = (e) => {
		e.preventDefault();
		const idxSection = Math.floor(e.pageX / WIDTH_SECTION);
		const sectionId = sectionsBlocks[idxSection]?.id;
		setPhantomTask(null);
		e.target.style.visibility = 'visible';

		const task = {
			oldPosition: oldTaskPosition,
			newPosition: currentPositionTask(e)
		};

		moveTask({
			newSectionId: sectionId,
			oldSectionId: oldSectionId,
			task
		});
	};

	const handleTaskPosition = (sectionId, taskId, taskElement) => {
		setTaskPosition({
			sectionId,
			taskId,
			x: taskElement.getBoundingClientRect().left,
			y: taskElement.getBoundingClientRect().top
		});
	};
	return (
		<div className="App">
			<Header />
			<span ref={phantomRef} className="phantom">
				<Task task={phantomTask && phantomTask.task} />
			</span>
			<main>
				<div className="main--section" ref={sectionsRef}>
					{sectionsBlocks.map((el) => {
						return (
							<Section
								startHandler={startHandler}
								dragHandler={dragHandler}
								endHandler={endHandler}
								handleTaskPosition={handleTaskPosition}
								key={el.id}
								addTask={() => createTask({ sectionId: el.id })}
								section={el}
								changeName={(newName) =>
									changeSectionName({ sectionId: el.id, newName })
								}
							/>
						);
					})}
					<CreateSection
						addSection={() =>
							addSection({
								id: uid(),
								tasks: [],
								name: 'New Section',
								color: '#cbcbcb'
							})
						}
					/>
				</div>
			</main>
		</div>
	);
}

export default App;
