import React from 'react';
import { ReactComponent as Carrot } from '../../images/icons/carrot.svg';
import { ReactComponent as Agree } from '../../images/icons/agree.svg';
import SubTask from '../subTask';

const TaskDetail = ({
	selectedTask,
	toggleTaskCompleted,
	activeTask,
	changeTaskDescription,
	addSubTask,
	changeSubTaskDescription,
	deleteSubTask,
	changeSubTaskCompleted
}) => {
	return (
		<>
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
					{selectedTask.subTasks.map((subTask) => {
						return (
							<SubTask
								key={subTask.id}
								subTask={subTask}
								changeSubTaskDescription={
									changeSubTaskDescription
								}
								activeTask={activeTask}
								deleteSubTask={deleteSubTask}
								changeSubTaskCompleted={changeSubTaskCompleted}
							/>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default TaskDetail;
