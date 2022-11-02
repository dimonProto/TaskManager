import React from 'react';
import TaskContextModal from "../modal/taskModal";


const TaskList = ({section,rightClickTask, toggleTaskModal, showTaskModal, cursorPosition, taskId,taskName, setTaskName,
                      startHandler,
                      overHandler,
                      dropHandler
}) => {


    return (
        <>
        <ul className="list--tasks">
            { section.tasks.map((task) =>
                <li className="task"
                    draggable
                    onDragStart={(e) => startHandler(e, task, section.id)}
                    onDrag={overHandler}
                    onDragEnd={dropHandler}
                    style={{borderColor: `${section.color}`}}
                    onContextMenu={(e) => rightClickTask(e, task.id, task.name)} key={task.id} >
                    { task.name}
                </li>)}
            <li className="task"
                style={{borderColor: `${section.color}`}}
               >
            </li>
        </ul>
        {showTaskModal && <TaskContextModal
            onClick={toggleTaskModal}
            cursorPosition={cursorPosition}
            taskId={taskId}
            sectionId={section.id}
            taskName={taskName}
            setTaskName={setTaskName}
        />}
        </>
    );
};

export default TaskList;