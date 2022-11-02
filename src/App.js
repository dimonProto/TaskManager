import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import {addSection, changeSectionName, createTask, deleteTask, moveTask} from './redux/slices/sectionSlice'
import Section from "./componets/section";
import CreateSection from "./componets/addSection";
import Header from "./componets/header";
import {useState} from "react";


function App() {
    const sectionsBlocks = useSelector((state) => state.section.sections );
    const dispatch = useDispatch();
    const [currentTask, setCurrentTask] = useState(null)
    const [currentSectionId, setCurrentSectionId] = useState(null)
    const [oldSectionId, setOldSectionId] = useState('')

    console.log(sectionsBlocks)
    const sizeSection = 278

    const startHandler = (e, task, sectionId) => {
        setCurrentTask(task)
        setOldSectionId(sectionId)
    }

    const overHandler = (e) => {
        e.preventDefault()
        const idxSection = Math.floor(e.screenX / sizeSection)
        const sectionId = sectionsBlocks[idxSection].id
        setCurrentSectionId(sectionId)
        console.log({currentSectionId,  oldSectionId, idxSection})
    }

    const dropHandler = (e) => {
        e.preventDefault()
        console.log(currentSectionId, currentTask.id, oldSectionId)
        dispatch(moveTask({newSectionId: currentSectionId, taskId: currentTask.id, oldSectionId}))
    }

  return (
    <div className="App">
          <Header/>
          <main>
            <div className="main--section"  >
                { sectionsBlocks.map((el) => {
                    return <Section

                        startHandler={startHandler}
                        overHandler={overHandler}
                        dropHandler={dropHandler}
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
