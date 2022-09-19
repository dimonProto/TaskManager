import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import {addSection, createTask} from './redux/slices/sectionSlice'
import Section from "./componets/section";
import CreateSection from "./componets/addSection";
import Header from "./componets/header";
import {ReactComponent as Delete} from "../src/images/icons/delete.svg";
import {useState} from "react";

function App() {
    const sectionsBlocks = useSelector((state) => state.section.sections);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({
        pageX:0,
        pageY:0
    })

    const handleModal = (e) => {
        e.preventDefault();
        if (e.nativeEvent.button === 0) {
            console.log('Left click');
        } else if (e.nativeEvent.button === 2) {
            setShowModal(!showModal)
            setCursorPosition({
                pageX:e.pageX,
                pageY:e.pageY
            })
        }
    };

  return (
    <div className="App">
          <Header/>
          <main>
            <div className="main--section">
                { sectionsBlocks.map((el) => {
                    return <Section key={el.id} addTask={() => dispatch(createTask( {sectionId:el.id}))} section={el} activeModal={handleModal}/>
                })}
                <CreateSection
                    addSection={() => dispatch(addSection())}
                />
            </div>
          </main>
        <div className={`overlay ${showModal && 'active'}`} onClick={() => setShowModal(false)}>
            <div className="box" style={{transform: `translate(${cursorPosition.pageX}px, ${cursorPosition.pageY}px)`}} onClick={(e) =>
                e.stopPropagation()}>
                <ul className="box--list">
                    <li className="box--item"><input type="text" /></li>
                    <li className="box--item">
                        <Delete/>
                        <span className="delete--text">Delete task</span></li>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default App;
