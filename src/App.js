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
    const [oldSectionId, setOldSectionId] = useState('')
    const [oldTaskId, setOldTaskId] = useState('')
    const newPositionTask = useRef()

    const startHandler = (e, task, sectionId, idx) => {
        setOldTaskId(idx)
        setCurrentTask(task)
        setOldSectionId(sectionId)
    }

    const dropHandler = (e) => {
        e.preventDefault()
        console.log(e)
    }

    const endHandler = (e) => {
        e.preventDefault()
        const idxSection = Math.floor(e.pageX / SIZE_SECTION)
        const sectionId = sectionsBlocks[idxSection].id
        console.log(oldTaskId, sectionId)
        dispatch(moveTask({newSectionId: sectionId, taskId: currentTask.id, oldSectionId: oldSectionId.id}))
    }

  return (
    <div className="App">
          <Header/>
          <main>
            <div className="main--section"  >
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
