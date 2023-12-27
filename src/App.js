import './App.css';
import { useSelector } from 'react-redux';
import Section from './componets/section';
import CreateSection from './componets/addSection';
import Header from './componets/header';
import { useRef, useState } from 'react';
import { useAction } from './hooks/useAction';
import { uid } from 'uid';
import { HEIGHT_TASK, WIDTH_SECTION } from './utils/constant';
import TaskWindow from './componets/taskWindow';
import { usePhantom } from './hooks/usePhantom';
import { useActiveTask } from './hooks/useActiveTask';
import TaskDetail from './componets/taskDetail';

const TASK_DRAG_TYPE = 'task';
const SECTION_DRAG_TYPE = 'section';

function App() {
	const sectionsBlocks = useSelector((state) => state.section.sections);
	const activeTask = useSelector((state) => state.section.activeTask);
	const startYPos = useSelector((state) => state.section.startYPosition);

	const selectedTask = useActiveTask();

	const {
		moveTask,
		addSection,
		changeTaskProperties,
		createTask,
		changeSectionProperty,
		setActiveTask,
		changeTaskProperty,
		addSubTask,
		deleteSubTask,
		changeSubTaskProperty,
		moveSection,
		changeSectionProperties
	} = useAction();

	const { PhantomJSX, handlePhantomPosition, clearPhantom, initPhantom } =
		usePhantom();
	const [oldSectionId, setOldSectionId] = useState(null);
	const [oldTaskPosition, setOldTaskPosition] = useState(null);
	const [oldSectionPosition, setOldSectionPosition] = useState(null);
	const [dragType, setDragType] = useState(null);

	const sectionsRef = useRef();
	const createSectionsRef = useRef();

	const startHandler = (e, task, section, idx, sectionsRef) => {
		const targetElement = e.target;
		let id = section.id;
		if (task) {
			setTimeout(() => {
				targetElement.style.visibility = 'hidden';
			}, 10);
			setOldTaskPosition(idx);
			setOldSectionId(section.id);
			initPhantom('task', task, {
				x: targetElement.getBoundingClientRect().left,
				y: targetElement.getBoundingClientRect().top
			});
			setDragType(TASK_DRAG_TYPE);
		} else {
			setDragType(SECTION_DRAG_TYPE);
			setOldSectionPosition(idx);

			initPhantom('section', section, {
				x: targetElement.getBoundingClientRect().left,
				y: targetElement.getBoundingClientRect().top
			});
		}
	};

	const dragHandler = (e) => {
		e.preventDefault();

		const idxSection = Math.floor(e.pageX / WIDTH_SECTION);
		const taskOrder = currentPositionTask(e);
		const taskList = sectionsBlocks[idxSection]?.tasks;
		if (taskOrder <= 0 || !taskList) return;
		handlePhantomPosition(
			taskList[taskOrder - 1],
			taskList.length === 0,
			startYPos,
			taskList[taskList.length - 1] || null,
			idxSection,
			sectionsBlocks[idxSection].id === oldSectionId
		);
	};
	const dragHandlerSection = (e) => {
		e.preventDefault();

		const idxSection = Math.floor(e.pageX / WIDTH_SECTION);

		handlePhantomPosition(
			null,
			null,
			0,
			0,
			idxSection,
			sectionsBlocks[idxSection].id === oldSectionId
		);
	};
	const currentPositionTask = (e) => {
		const sectionTop =
			sectionsRef && sectionsRef.current.getBoundingClientRect().top;
		return Math.floor((e.pageY - sectionTop) / HEIGHT_TASK);
	};

	const endHandler = (e) => {
		e.preventDefault();
		const idxSection = Math.floor(e.pageX / WIDTH_SECTION);

		if (dragType === TASK_DRAG_TYPE) {
			const sectionId = sectionsBlocks[idxSection]?.id;

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
		} else if (dragType === SECTION_DRAG_TYPE) {
			const section = {
				oldPosition: oldSectionPosition,
				newPosition: idxSection
			};
			moveSection({
				section
			});
		}
		clearPhantom();
	};

	const handleTaskPosition = (sectionId, taskId, taskElement) => {
		changeTaskProperties({
			sectionId,
			taskId,
			property: ['x', 'y', 'height'],
			value: [
				taskElement.getBoundingClientRect().left,
				taskElement.getBoundingClientRect().top,
				taskElement.getBoundingClientRect().height
			]
		});
	};

	const handleAddSection = (sectionElement) => {
		addSection({
			id: uid(),
			tasks: [],
			name: 'New Section',
			color: '#cbcbcb',
			x: sectionElement.getBoundingClientRect().left,
			Y: sectionElement.getBoundingClientRect().top
		});
	};

	const handleChangeSectionName = (sectionId, newName) => {
		changeSectionProperty({
			sectionId,
			property: 'name',
			value: newName
		});
	};

	const toggleTaskCompleted = (sectionId, taskId, value) => {
		changeTaskProperty({
			sectionId,
			taskId,
			value,
			property: 'completed'
		});
	};

	const changeTaskDescription = (sectionId, taskId, value) => {
		changeTaskProperty({
			sectionId,
			taskId,
			value,
			property: 'description'
		});
	};

	const changeSubTaskCompleted = (sectionId, taskId, subTaskId, value) => {
		changeSubTaskProperty({
			sectionId,
			taskId,
			subTaskId,
			value,
			property: 'completed'
		});
	};

	const changeSubTaskDescription = (sectionId, taskId, subTaskId, value) => {
		changeSubTaskProperty({
			sectionId,
			taskId,
			subTaskId,
			value,
			property: 'description'
		});
	};
	return (
		<div className="App">
			<Header />
			<PhantomJSX />
			<main>
				<div className="main--section" ref={sectionsRef}>
					{sectionsBlocks.map((el, idxPositionSection) => {
						return (
							<Section
								startHandler={startHandler}
								dragHandler={dragHandler}
								endHandler={endHandler}
								handleTaskPosition={handleTaskPosition}
								idxPositionSection={idxPositionSection}
								dragHandlerSection={dragHandlerSection}
								sectionsRef={sectionsRef}
								key={el.id}
								addTask={() => createTask({ sectionId: el.id })}
								section={el}
								changeName={(newName) =>
									handleChangeSectionName(el.id, newName)
								}
							/>
						);
					})}
					<CreateSection
						createSectionsRef={createSectionsRef}
						addSection={handleAddSection}
					/>
				</div>
			</main>
			{activeTask && (
				<TaskWindow
					id={activeTask.taskId}
					onClear={() => setActiveTask(null)}
				>
					<TaskDetail
						selectedTask={selectedTask}
						toggleTaskCompleted={toggleTaskCompleted}
						activeTask={activeTask}
						changeTaskDescription={changeTaskDescription}
						addSubTask={addSubTask}
						changeSubTaskDescription={changeSubTaskDescription}
						deleteSubTask={deleteSubTask}
						changeSubTaskCompleted={changeSubTaskCompleted}
					/>
				</TaskWindow>
			)}
		</div>
	);
}

export default App;
