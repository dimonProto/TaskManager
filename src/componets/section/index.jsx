import React from 'react';
import {ReactComponent as Plus} from "../../images/icons/plus.svg";

const Section = ({addTask, section, activeModal, setSectionId, changeName, activeColor}) => {
    const rightClickSection = (e,taskId) => {
        setSectionId(section.id)
        activeModal(e,taskId)
    }

    const rightClickTask = (e,taskId) => {
        e.stopPropagation()
        rightClickSection(e,taskId)
    }


    return (
        <div className="section" onClick={activeModal}  onContextMenu={(e) => rightClickSection(e)} >
            <div className="section--header" >
                <div className="section--input" style={{backgroundColor: `${activeColor}`}}>
                    <input type="text"  placeholder="Section label" value={section.name}
                           onChange={(e) => changeName(e.target.value)}
                    />
                </div>
                <div className="button--add"  onClick={addTask}>
                    <span> Add Task</span>
                    <Plus/>
                </div>
            </div>
            <ul className="list--tasks">
                { section.tasks.map(task => <li className="task"  onContextMenu={(e) => rightClickTask(e, task.id)} key={task.id} >{ task.name}</li>)}
            </ul>
        </div>
    );
};

export default Section;