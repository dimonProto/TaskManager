import React, {useRef} from 'react';

const Task = ({color, section, idx, task,startHandler,dropHandler,endHandler,rightClickTask}) => {
    const currentTask = useRef()
    if(!task) return

    return (
        <li className="task"
            ref={currentTask}
            style={section && {borderColor: `${section.color}`}}
            draggable
            onDragStart={(e) => startHandler(e, task, section.id, idx, currentTask.current)}
            onDrag={(e) => dropHandler(e, task)}
            onDragEnd={e => endHandler(e, currentTask.current)}
            color={color}
            onContextMenu={(e) => rightClickTask(e, task.id, task.name)} key={task.id}>
            { task.name}
        </li>
    );
};

export default Task;