import React from 'react';

const ModalWrapper = ({ children, onClick, cursorPosition }) => {
	console.log(onClick);
	return (
		<div className={`overlay active`} onClick={onClick && onClick}>
			<div
				className="box"
				style={{
					transform: `translate(${cursorPosition.pageX}px, ${cursorPosition.pageY}px)`
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default ModalWrapper;
