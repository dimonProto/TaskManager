import React, {useState} from 'react';
import {ReactComponent as Plus} from "../../images/icons/plus.svg";
import Task from "../task";
import SectionContextModal from "../modal/sectionModal";
import {createTask} from "../../redux/slices/sectionSlice";
import {useDispatch} from 'react-redux'
const Section = ({addTask, section, changeName}) => {
    const [showSectionModal, setSectionModal] = useState(false)
    const [showTaskModal, setTaskModal] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({
        pageX:0,
        pageY:0
    })
    const [taskId, setTaskId] = useState('')
    const dispatch = useDispatch();

    const handleModal = (e,taskId) => {
        e.preventDefault();
        if (e.nativeEvent.button === 0) {
            console.log('Left click');
        } else if (e.nativeEvent.button === 2) {
            setCursorPosition({
                pageX:e.pageX,
                pageY:e.pageY
            })
            if(taskId){
                toggleTaskModal(taskId)
            } else {
                toggleSectionModal()
            }
        }
    };

    const toggleSectionModal = () =>  setSectionModal(!showSectionModal)
    const toggleTaskModal = () =>  setTaskModal(!showTaskModal)

    const handleAddTask = () => {
        dispatch(createTask( {sectionId:section.id}))
        toggleSectionModal()
    }

    const rightClickSection = (e,taskId) => {
        handleModal(e,taskId)
    }

    const rightClickTask = (e,taskId) => {
        e.stopPropagation()
        rightClickSection(e,taskId)
        setTaskId(taskId)
    }

    return (
        <>
        <div className="section"   onContextMenu={(e) => rightClickSection(e)} >
            <div className="section--header" >
                <div className="section--input" style={{backgroundColor: `${section.color}`}}>
                    <input type="text"  placeholder="Section label" value={section.name}
                           onChange={(e) => changeName(e.target.value)}
                    />
                </div>
                <div className="button--add"  onClick={addTask}>
                    <span> Add Task</span>
                    <Plus />
                </div>
            </div>
            <Task
                section={section}
                rightClickTask={rightClickTask}
                toggleTaskModal={toggleTaskModal}
                showTaskModal={showTaskModal}
                cursorPosition={cursorPosition}
                taskId={taskId}
                sectionId={section.id}
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