import React from 'react';
import ModalWrapper from '../index';
import { ReactComponent as Delete } from '../../../images/icons/delete.svg';
import { useAction } from '../../../hooks/useAction';

const TaskContextModal = ({
	taskId,
	sectionId,
	taskName,
	setTaskName,
	...props
}) => {
	const { deleteTask, changeTaskProperty } = useAction();

	const handleDelete = () => {
		deleteTask({ sectionId, taskId });
		props.onClick();
	};

	const changeName = (e) => {
		changeTaskProperty({
			sectionId,
			taskId,
			value: e.target.value,
			property: 'name'
		});
		setTaskName(e.target.value);
	};
	return (
		<ModalWrapper {...props}>
			<ul className="box--list">
				<li className="box--item">
					<input type="text" value={taskName} onChange={changeName} />
				</li>
				<li className="box--item" onClick={handleDelete}>
					<Delete />
					<span className="delete--text">Delete task</span>
				</li>
			</ul>
		</ModalWrapper>
	);
};

export default TaskContextModal;
