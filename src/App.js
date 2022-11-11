import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import {addSection, changeSectionName, createTask, deleteTask, moveTask} from './redux/slices/sectionSlice'
import Section from "./componets/section";
import CreateSection from "./componets/addSection";
import Header from "./componets/header";
import {useRef, useState} from "react";
import {HEIGHT_TASK, SIZE_SECTION} from "./utils/constant";
import Task from "./componets/taskList/task";


function App() {
    const sectionsBlocks = useSelector((state) => state.section.sections );
    const dispatch = useDispatch();
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
        setOldTaskPosition(idx)
        setOldSectionId(sectionId)
        setPositionPhantom(e.target.getBoundingClientRect().left, e.target.getBoundingClientRect().top)
        setPhantomTask(task)
    }

    const dropHandler = (e) => {
        e.preventDefault()
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
        const task = {
            oldPosition: oldTaskPosition,
            newPosition: currentPositionTask(e),
        }

        dispatch(moveTask({
            newSectionId: sectionId,
            oldSectionId: oldSectionId,
            task
        }))
    }
  return (
    <div className="App">
          <Header/>
          <span ref={phantomRef} style={{position: "fixed", opacity:'0.5' }}>
               <Task task={ phantomTask} style={{width: '235px'}}/>
          </span>
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
