import React from 'react';
import { ReactComponent as User } from '../../images/icons/user.svg';
import { ReactComponent as Delete } from '../../images/icons/delete.svg';
import { ReactComponent as Agree } from '../../images/icons/agree.svg';

const SubTask = ({
	subTask,
	changeSubTaskDescription,
	activeTask,
	deleteSubTask,
	changeSubTaskCompleted
}) => {
	return (
		<li className={`animateTask ${subTask.completed ? 'greenBg' : ''}`}>
			<User className="subUser" />
			<input
				type="text"
				placeholder="New note"
				className="subInput"
				value={subTask.description}
				onChange={(e) =>
					changeSubTaskDescription(
						activeTask.sectionId,
						activeTask.taskId,
						subTask.id,
						e.target.value
					)
				}
			/>
			<div className="subSettings">
				<Delete
					className="subDelete"
					onClick={() =>
						deleteSubTask({
							sectionId: activeTask.sectionId,
							taskId: activeTask.taskId,
							subTaskId: subTask.id
						})
					}
				/>
				<div className="titleBtn">
					<Agree
						onClick={() => {
							changeSubTaskCompleted(
								activeTask.sectionId,
								activeTask.taskId,
								subTask.id,
								!subTask.completed
							);
						}}
					/>
				</div>
			</div>
		</li>
	);
};

export default SubTask;
