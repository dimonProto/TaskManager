import './App.css';
import { useSelector} from 'react-redux'
import Section from "./componets/section";
import CreateSection from "./componets/addSection";
import Header from "./componets/header";
import {useRef, useState} from "react";
import {HEIGHT_TASK, SIZE_SECTION} from "./utils/constant";
import Task from "./componets/taskList/task";
import {useAction} from "./hooks/useAction";
import {uid} from "uid";

function App() {
    const sectionsBlocks = useSelector((state) => state.section.sections );
    const {moveTask, addSection, setTaskPosition, createTask, changeSectionName} = useAction()
    const [oldSectionId, setOldSectionId] = useState(null)
    const [oldTaskPosition, setOldTaskPosition] = useState(null)
    const [phantomTask, setPhantomTask] = useState(null)
    const sectionsRef = useRef()
    const phantomRef = useRef()

    const setPositionPhantom = (left, top) => {
        if (!phantomRef) return null
        phantomRef.current.style.left = left.toString() + 'px'
        phantomRef.current.style.top = top.toString() + 'px'
    }

    const startHandler = (e, task, sectionId, idx) => {
        const targetElement = e.target

        setTimeout(() => {
            targetElement.style.visibility='hidden'
        },10)

        setOldTaskPosition(idx)
        setOldSectionId(sectionId)
        setPositionPhantom(targetElement.getBoundingClientRect().left, targetElement.getBoundingClientRect().top)
        setPhantomTask(task)
    }

    const dragHandler = (e) => {
        e.preventDefault()
        const idxSection = Math.floor(e.pageX / SIZE_SECTION)
        const taskOrder = currentPositionTask(e)
        if(taskOrder < 0) return
        let task = sectionsBlocks[idxSection].tasks[taskOrder]
        if(!idxSection) return;
        setPositionPhantom(task.x,task.y)
    }
    const currentPositionTask = (e) => {
        const sectionTop = sectionsRef && sectionsRef.current.getBoundingClientRect().top
        return Math.floor((e.pageY - sectionTop) / HEIGHT_TASK)
    }

    const endHandler = (e) => {
        e.preventDefault()
        const idxSection = Math.floor(e.pageX / SIZE_SECTION)
        const sectionId = sectionsBlocks[idxSection].id
        setPhantomTask(null)
        e.target.style.visibility='visible'

        const task = {
            oldPosition: oldTaskPosition,
            newPosition: currentPositionTask(e),
        }

        moveTask({
            newSectionId: sectionId,
            oldSectionId: oldSectionId,
            task
        })
    }

    const handleTaskPosition = (sectionId, taskId, taskElement) => {
         setTaskPosition({
             sectionId,
             taskId,
             x: taskElement.getBoundingClientRect().left,
             y: taskElement.getBoundingClientRect().top
         })
    }

  return (
    <div className="App">
          <Header/>
          <span ref={phantomRef} className='phantom' >
               <Task task={phantomTask} />
          </span>
          <main>
            <div className="main--section"  ref={sectionsRef}>
                { sectionsBlocks.map((el) => {
                    return <Section
                        startHandler={startHandler}
                        dragHandler={dragHandler}
                        endHandler={endHandler}
                        handleTaskPosition={handleTaskPosition}
                        key={el.id}
                        addTask={() => createTask( {sectionId:el.id}) }
                        section={el}
                        changeName={(newName) => changeSectionName({sectionId:el.id, newName})}
                    />
                })}
                <CreateSection
                    addSection={() => addSection({
                        id: uid(),
                        tasks: [],
                        name: 'New Section',
                        color: '#cbcbcb',
                    })}
                />
            </div>
          </main>
    </div>
  );
}

export default App;
