import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import {addSection, changeSectionName, createTask, deleteTask, moveTask} from './redux/slices/sectionSlice'
import Section from "./componets/section";
import CreateSection from "./componets/addSection";
import Header from "./componets/header";
import {useRef, useState} from "react";
import {SIZE_SECTION} from "./utils/constant";


function App() {
    const sectionsBlocks = useSelector((state) => state.section.sections );
    const dispatch = useDispatch();
    const [currentTask, setCurrentTask] = useState(null)
    const [oldSectionId, setOldSectionId] = useState(null)
    const [oldTaskPosition, setOldTaskPosition] = useState(null)
    const sectionsRef = useRef()

    const startHandler = (e, task, sectionId, idx) => {
        setOldTaskPosition(idx)
        setCurrentTask(task)
        setOldSectionId(sectionId)
    }

    const dropHandler = (e) => {
        e.preventDefault()
    }
    const currentPositionTask = (e) => {
        const sectionTop = sectionsRef && sectionsRef.current.getBoundingClientRect().top
        const heightTask = 60
        console.log(Math.floor((e.pageY - sectionTop) / heightTask))
        return Math.floor((e.pageY - sectionTop) / heightTask)
    }


    const endHandler = (e) => {
        e.preventDefault()
        const idxSection = Math.floor(e.pageX / SIZE_SECTION)
        const sectionId = sectionsBlocks[idxSection].id
        currentPositionTask(e)

        const task = {
            taskId: currentTask.id,
            oldTaskPosition: oldTaskPosition,
            newTaskPosition: currentPositionTask(e),
        }

        dispatch(moveTask({
            newSectionId: sectionId,
            oldSectionId: oldSectionId.id,
            task
        }))
    }

  return (
    <div className="App">
          <Header/>
          <main>
            <div className="main--section"  ref={sectionsRef}>
                { sectionsBlocks.map((el) => {
                    return <Section
                        startHandler={startHandler}
                        dropHandler={dropHandler}
                        endHandler={endHandler}
                        key={el.id}
                        addTask={() => dispatch(createTask( {sectionId:el.id}))}
                        section={el}
                        changeName={(newName) => dispatch(changeSectionName({sectionId:el.id, newName}))}
                    />
                })}
                <CreateSection
                    addSection={() => dispatch(addSection())}
                />
            </div>
          </main>
    </div>
  );
}

export default App;
