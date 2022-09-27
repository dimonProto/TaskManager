import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import {addSection, changeSectionName, createTask} from './redux/slices/sectionSlice'
import Section from "./componets/section";
import CreateSection from "./componets/addSection";
import Header from "./componets/header";
import {useState} from "react";
import SectionContextModal from "./componets/modal/sectionModal";
import TaskContextModal from "./componets/modal/taskModal";

function App() {
    const sectionsBlocks = useSelector((state) => state.section.sections);
    const dispatch = useDispatch();
    const [showSectionModal, setSectionModal] = useState(false)
    const [showTaskModal, setTaskModal] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({
        pageX:0,
        pageY:0
    })
    const [sectionId, setSectionId] = useState('')

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
        dispatch(createTask( {sectionId:sectionId}))
        toggleSectionModal()
    }


  return (
    <div className="App">
          <Header/>
          <main>
            <div className="main--section">
                { sectionsBlocks.map((el) => {
                    return <Section
                        key={el.id}
                        addTask={() => dispatch(createTask( {sectionId:el.id}))}
                        section={el}
                        activeModal={ handleModal}
                        setSectionId={setSectionId}
                        changeName={(newName) => dispatch(changeSectionName({sectionId:el.id, newName}))}
                    />
                })}
                <CreateSection
                    addSection={() => dispatch(addSection())}
                />
            </div>
          </main>
        {showSectionModal && <SectionContextModal
            onClick={toggleSectionModal}
            cursorPosition={cursorPosition}
            addTask={handleAddTask}
            sectionId={sectionId}
        />}
        {showTaskModal && <TaskContextModal
            onClick={toggleTaskModal}
            cursorPosition={cursorPosition}
        />}
    </div>
  );
}

export default App;
