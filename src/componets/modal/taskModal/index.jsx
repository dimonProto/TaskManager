import React from 'react';
import ModalWrapper from '../index';
import { ReactComponent as Delete } from '../../../images/icons/delete.svg';
import { useAction } from '../../../hooks/useAction';
import useDebounce from '../../../hooks/useDebounce';

const TaskContextModal = ({
	taskId,
	sectionId,
	taskName,
	setTaskName,
	...props
}) => {
	const { deleteTask, changeTaskProperty } = useAction();
	useDebounce(() =>
		changeTaskProperty({
			sectionId,
			taskId,
			value: taskName,
			property: 'name'
		})
	);
	const handleDelete = () => {
		deleteTask({ sectionId, taskId });
		props.onClick();
	};
	const changeName = (e) => {
		setTaskName(e.target.value);
	};
	return (
		<ModalWrapper {...props}>
			<ul className="box--list">
				<li className="box--item box--item__img">
					<input type="text" value={taskName} onChange={changeName} />
					{/*{isLoading && <Check />}*/}
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
