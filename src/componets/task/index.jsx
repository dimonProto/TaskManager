import React from 'react';
import TaskContextModal from "../modal/taskModal";

const Task = ({section,rightClickTask, toggleTaskModal, showTaskModal, cursorPosition}) => {
    return (
        <>
        <ul className="list--tasks">
            { section.tasks.map(task =>
                <li className="task"
                    style={{borderColor: `${section.color}`}}
                    onContextMenu={(e) => rightClickTask(e, task.id)} key={task.id} >
                    { task.name}
                </li>)}
        </ul>
        {showTaskModal && <TaskContextModal
            onClick={toggleTaskModal}
            cursorPosition={cursorPosition}
        />}
        </>
    );
};

export default Task;