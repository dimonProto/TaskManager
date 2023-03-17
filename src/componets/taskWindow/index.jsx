import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';
import style from './style';

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
				'width=900,height=600,left=200,top=200'
			);
			newWindow.current.document.body.appendChild(container);
			newWindow.current.document.head.appendChild(style);
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
