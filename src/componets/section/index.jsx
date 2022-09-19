import React from 'react';
import {ReactComponent as Plus} from "../../images/icons/plus.svg";

const Section = ({addTask, section, activeModal}) => {

    return (
        <div className="section" onContextMenu={activeModal}>
            <div className="section--header" >
                <div className="section--input">
                    <input type="text" placeholder="Section label"  />
                </div>
                <div className="button--add"  onClick={addTask}>
                    <span> Add Task</span>
                    <Plus/>
                </div>
            </div>
            <ul className="list--tasks">
                { section.tasks.map(task => <li className="task" key={task.id} onClick={activeModal} onContextMenu={activeModal}>{ task.name}</li>)}
            </ul>
        </div>
    );
};

export default Section;