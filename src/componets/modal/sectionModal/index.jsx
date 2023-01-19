import React from 'react';
import ModalWrapper from '../index';
import { ReactComponent as Delete } from '../../../images/icons/delete.svg';
import { ReactComponent as Plus } from '../../../images/icons/plus.svg';
import { COLORS } from '../../../utils/constant';
import { useAction } from '../../../hooks/useAction';
import DebounceInput from '../../debounceInput';

const SectionContextModal = ({
	addTask,
	sectionId,
	sectionName,
	changeName,
	color: sectionColor,
	...props
}) => {
	const { changeSectionProperty, deleteSection } = useAction();

	const handleColor = (color) => {
		changeSectionProperty({
			sectionId: sectionId,
			property: 'color',
			value: color
		});
	};

	const handleDeleteSection = () => {
		deleteSection(sectionId);
	};

	return (
		<ModalWrapper {...props}>
			<ul className="box--list">
				<li className="box--item" onClick={addTask}>
					<Plus />
					<span className="delete--text">Add task</span>
				</li>
				<li className="box--item">
					<DebounceInput value={sectionName} onChange={changeName} />
					{/*<input*/}
					{/*	type="text"*/}
					{/*	value={sectionName}*/}
					{/*	onChange={(event) => changeName(event.target.value)}*/}
					{/*/>*/}
				</li>
				<li className="box--item">
					<ul className="colors">
						{COLORS.map((color, idx) => {
							return (
								<li
									className={`colors--item ${
										sectionColor === color && 'active'
									}`}
									onClick={() => handleColor(color, idx)}
									key={idx}
									style={{ background: `${color}` }}
								></li>
							);
						})}
					</ul>
				</li>
				<li className="box--item" onClick={handleDeleteSection}>
					<Delete />
					<span className="delete--text">Delete section</span>
				</li>
			</ul>
		</ModalWrapper>
	);
};

export default SectionContextModal;
