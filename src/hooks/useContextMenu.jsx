import { useState } from 'react';

export const useContextMenu = () => {
	const [cursorPosition, setCursorPosition] = useState({
		pageX: 0,
		pageY: 0
	});

	const handleModal = (e, callback) => {
		e.preventDefault();

		if (e.nativeEvent.button === 2) {
			setCursorPosition({
				pageX: e.pageX,
				pageY: e.pageY
			});

			callback();
		}
	};
	return [cursorPosition, handleModal];
};
