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
import { ReactComponent as Carrot } from './images/icons/carrot.svg';
import { ReactComponent as Agree } from './images/icons/agree.svg';
import { ReactComponent as Delete } from './images/icons/delete.svg';
import { ReactComponent as User } from './images/icons/user.svg';
import { useActiveTask } from './hooks/useActiveTask';

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
		deleteSubTask
	} = useAction();

	const { PhantomJSX, handlePhantomPosition, clearPhantom, initPhantom } =
		usePhantom();
	const [oldSectionId, setOldSectionId] = useState(null);
	const [oldTaskPosition, setOldTaskPosition] = useState(null);
	const sectionsRef = useRef();

	const startHandler = (e, task, sectionId, idx) => {
		const targetElement = e.target;

		setTimeout(() => {
			targetElement.style.visibility = 'hidden';
		}, 10);

		setOldTaskPosition(idx);
		setOldSectionId(sectionId);
		initPhantom(task, {
			x: targetElement.getBoundingClientRect().left,
			y: targetElement.getBoundingClientRect().top
		});
	};

	const dragHandler = (e) => {
		e.preventDefault();

		const idxSection = Math.floor(e.pageX / WIDTH_SECTION);
		const taskOrder = currentPositionTask(e);
		const taskList = sectionsBlocks[idxSection]?.tasks;
		if (taskOrder <= 0) return;

		handlePhantomPosition(
			taskList[taskOrder - 1],
			taskList.length === 0,
			startYPos,
			taskList[taskList.length - 1] || null,
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
		const sectionId = sectionsBlocks[idxSection]?.id;
		clearPhantom();
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
		changeTaskProperties({
			sectionId,
			taskId,
			property: ['x', 'y'],
			value: [
				taskElement.getBoundingClientRect().left,
				taskElement.getBoundingClientRect().top
			]
		});
	};

	const handleAddTask = () => {
		addSection({
			id: uid(),
			tasks: [],
			name: 'New Section',
			color: '#cbcbcb'
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
	return (
		<div className="App">
			<Header />
			<PhantomJSX />
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
									handleChangeSectionName(el.id, newName)
								}
							/>
						);
					})}
					<CreateSection addSection={handleAddTask} />
				</div>
			</main>
			{activeTask && (
				<TaskWindow
					id={activeTask.taskId}
					onClear={() => setActiveTask(null)}
				>
					<header className="draggable">
						<Carrot className="header--img" />
						<p>Task manager</p>
					</header>
					<div className="title">
						<p>{selectedTask.name}</p>
						<div
							className={`titleBtn ${
								selectedTask.completed ? 'greenBtn' : ''
							}`}
							onClick={() =>
								toggleTaskCompleted(
									activeTask.sectionId,
									activeTask.taskId,
									!selectedTask.completed
								)
							}
						>
							<Agree />
						</div>
					</div>
					<div className="main">
						<label htmlFor="">Description</label>
						<textarea
							name=""
							id=""
							cols="30"
							rows="10"
							value={selectedTask.description}
							onChange={(e) =>
								changeTaskDescription(
									activeTask.sectionId,
									activeTask.taskId,
									e.target.value
								)
							}
						/>
					</div>
					<div className="subTask">
						<div className="subBntMain">
							<p>Sub Task</p>
							<div
								className="subBnt"
								onClick={() =>
									addSubTask({
										sectionId: activeTask.sectionId,
										taskId: activeTask.taskId
									})
								}
							>
								<span>Add</span>
							</div>
						</div>
						<ul className="subList">
							{selectedTask.subTask.map((subTask) => {
								return (
									<li
										key={subTask.id}
										className="animateTask"
									>
										<User className="subUser" />
										<input
											type="text"
											placeholder="New note"
											className="subInput"
										/>
										<div className="subSettings">
											<Delete
												className="subDelete"
												onClick={() =>
													deleteSubTask({
														sectionId:
															activeTask.sectionId,
														taskId: activeTask.taskId,
														subTaskId: subTask.id
													})
												}
											/>
											<div className="titleBtn">
												<Agree />
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</TaskWindow>
			)}
		</div>
	);
}

export default App;
