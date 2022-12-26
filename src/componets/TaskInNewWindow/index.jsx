import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const TaskInNewWindow = ({ children, onClear }) => {
	const openWindow = useRef(
		window.open('', '', 'width=600,height=400,left=200,top=200')
	);
	const containerEl = document.createElement('div');
	useEffect(() => {
		const currentWindow = openWindow.current;
		return () => {
			currentWindow.close();
			onClear();
		};
	}, []);
	openWindow.current.document.title = 'Task Manager';
	openWindow.current.document.body.appendChild(containerEl);

	return ReactDOM.createPortal(children, containerEl);
};

export default TaskInNewWindow;
