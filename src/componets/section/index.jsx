import React from 'react';
import {ReactComponent as Plus} from "../../images/icons/plus.svg";
import Task from "../task";
import SectionContextModal from "../modal/sectionModal";

const Section = (
    {addTask,
     section,
     activeModal,
     setSectionId,
     changeName,
     toggleTaskModal,
     showTaskModal,
     cursorPosition,
     showSectionModal,
     toggleSectionModal,
     handleAddTask,
        sectionId
}) => {
    const rightClickSection = (e,taskId) => {
        setSectionId(section.id)
        activeModal(e,taskId)
    }

    const rightClickTask = (e,taskId) => {
        e.stopPropagation()
        rightClickSection(e,taskId)
    }

    return (
        <>
        <div className="section" onClick={activeModal}  onContextMenu={(e) => rightClickSection(e)} >
            <div className="section--header" >
                <div className="section--input" style={{backgroundColor: `${section.color}`}}>
                    <input type="text"  placeholder="Section label" value={section.name}
                           onChange={(e) => changeName(e.target.value)}
                    />
                </div>
                <div className="button--add"  onClick={addTask}>
                    <span> Add Task</span>
                    <Plus/>
                </div>
            </div>
            <Task
                section={section}
                rightClickTask={rightClickTask}
                toggleTaskModal={toggleTaskModal}
                showTaskModal={showTaskModal}
                cursorPosition={cursorPosition}
            />
        </div>
        {showSectionModal && <SectionContextModal
            onClick={toggleSectionModal}
            cursorPosition={cursorPosition}
            addTask={handleAddTask}
            sectionId={section.id}
            color={section.color}
        />}
        </>
    );
};

export default Section;