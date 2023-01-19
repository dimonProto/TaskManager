import React, { useState } from 'react';
import ModalWrapper from '../index';
import { ReactComponent as Delete } from '../../../images/icons/delete.svg';
import { ReactComponent as Check } from '../../../images/icons/check.svg';
import { useAction } from '../../../hooks/useAction';
import DebounceInput from '../../debounceInput';

const TaskContextModal = ({
	taskId,
	sectionId,
	taskName,
	setTaskName,
	...props
}) => {
	const { deleteTask, changeTaskProperty } = useAction();
	const [isLoading, setIsLoading] = useState(false);

	const handleDelete = () => {
		deleteTask({ sectionId, taskId });
		props.onClick();
	};

	const changeName = (value) => {
		setTaskName(value);
		changeTaskProperty({
			sectionId,
			taskId,
			value,
			property: 'name'
		});
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};
	return (
		<ModalWrapper {...props}>
			<ul className="box--list">
				<li className="box--item box--item__img">
					<DebounceInput value={taskName} onChange={changeName} />
					{isLoading && <Check />}
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
