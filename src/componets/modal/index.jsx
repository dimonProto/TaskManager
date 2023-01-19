import React, { useEffect } from 'react';
import { useAction } from '../../hooks/useAction';

const ModalWrapper = ({ children, onClick, cursorPosition }) => {
	const { toggleModal } = useAction();

	useEffect(() => {
		toggleModal(true);
		return () => {
			toggleModal(false);
		};
	}, []);
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
