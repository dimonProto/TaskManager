import React from 'react';
import { ReactComponent as Plus } from '../../images/icons/plus.svg';

const CreateSection = ({ addSection, createSectionsRef }) => {
	return (
		<div
			ref={createSectionsRef}
			className="add--section"
			onClick={() => addSection(createSectionsRef.current)}
		>
			<span>Add section </span>
			<Plus />
		</div>
	);
};

export default CreateSection;
