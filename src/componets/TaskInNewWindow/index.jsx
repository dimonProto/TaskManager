import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const TaskInNewWindow = ({ children }) => {
	const openWindow = useRef(
		window.open('', '', 'width=600,height=400,left=200,top=200')
	);
	const containerEl = document.createElement('div');
	useEffect(() => {
		console.log(openWindow);
		const currentWindow = openWindow.current;
		return () => currentWindow.close();
	}, []);
	openWindow.current.document.title = 'Task Manager';
	openWindow.current.document.body.appendChild(containerEl);
	console.log(openWindow.current.document);

	return ReactDOM.createPortal(children, containerEl);
};

export default TaskInNewWindow;
