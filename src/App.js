import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import {addSection, changeSectionName, createTask} from './redux/slices/sectionSlice'
import Section from "./componets/section";
import CreateSection from "./componets/addSection";
import Header from "./componets/header";


function App() {
    const sectionsBlocks = useSelector((state) => state.section.sections );
    const dispatch = useDispatch();
    console.log(sectionsBlocks)
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
