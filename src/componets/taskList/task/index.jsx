import React from 'react';

const Task = ({color, section, idx, task,startHandler,dropHandler,endHandler,rightClickTask, style}) => {
    return (
        <li className="task"
            style={style}
            draggable
            onDragStart={(e) => startHandler(e, task, section, idx)}
            onDrag={(e) => dropHandler(e, task)}
            onDragEnd={endHandler}
            color={color}
            onContextMenu={(e) => rightClickTask(e, task.id, task.name)} key={task.id}>
            { task.name}
        </li>
    );
};

export default Task;