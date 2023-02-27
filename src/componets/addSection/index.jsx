import React from 'react';
import { ReactComponent as Plus } from '../../images/icons/plus.svg';

const CreateSection = ({ addSection }) => {
	return (
		<div className="add--section" onClick={addSection}>
			<span>Add section </span>
			<Plus />
		</div>
	);
};

export default CreateSection;
