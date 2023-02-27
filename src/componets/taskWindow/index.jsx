import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';

const TaskWindow = ({ children, onClear, id }) => {
	const [container, setContainer] = useState(null);
	const [prevId, setPrevId] = useState('');
	const newWindow = useRef(null);

	useEffect(() => {
		setContainer(document.createElement('div'));
	}, []);

	useEffect(() => {
		if (container) {
			newWindow.current = window.open(
				'',
				'',
				'width=600,height=400,left=200,top=200'
			);
			newWindow.current.document.write(`
				<html>
				<head>
					<link rel="stylesheet" type="text/css" href="./index.css">
				</head>
				<body>
			`);
			newWindow.current.document.body.appendChild(container);
		
			const current = newWindow.current;

			const isWindowClosedInterval = setInterval(() => {
				if (current.closed) {
					onClear();
					clearInterval(isWindowClosedInterval);
				}
			}, 1000);

			return () => {
				current.close();
				onClear();
			};
		}
	}, [container]);

	if (prevId !== id && newWindow.current) {
		setPrevId(id);
		newWindow.current.focus();
	}

	return container && ReactDOM.createPortal(children, container);
};

export default TaskWindow;
