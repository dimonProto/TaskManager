import React from 'react';
import TaskContextModal from "../modal/taskModal";
import Task from "./task";


const TaskList = (
    {
      section,
      rightClickTask,
      toggleTaskModal,
      showTaskModal,
      cursorPosition,
      taskId,
      taskName,
      setTaskName,
      ...props
}) => {

    return (
        <>
        <ul className="list--tasks">
            { section.tasks.map((task, idx) =>
                <Task key={task.id} task={task} section={section} idx={idx} rightClickTask={rightClickTask} {...props}/>
            )}
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