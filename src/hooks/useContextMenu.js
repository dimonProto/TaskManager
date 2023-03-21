import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useContextMenu = () => {
	const modalValue = useSelector((state) => state.modal.activeModal);
	const [cursorPosition, setCursorPosition] = useState({
		pageX: 0,
		pageY: 0
	});
	const handleModal = (e, callback) => {
		e.preventDefault();
		if (e.nativeEvent.button === 2 && !modalValue) {
			setCursorPosition({
				pageX: e.pageX,
				pageY: e.pageY
			});
			callback();
		}
	};
	return [cursorPosition, handleModal];
};
