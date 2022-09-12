import './App.css';
import {ReactComponent as Plus} from './images/icons/plus.svg';
import { useSelector, useDispatch } from 'react-redux'
import { addSection } from './redux/slices/sectionSlice'

function App() {
    const count = useSelector((state) => state.section.value)
    const dispatch = useDispatch()
    console.log(count, 'count')

  return (
    <div className="App">
      <header>
        <h1>Task manager </h1>
      </header>
      <main>
        <div className="main--section">
            <div className="section">
                <div className="section--header">
                    <div className="section--input">
                        <input type="text" placeholder="Section label"/>
                    </div>
                    <div className="button--add" >
                        <span > Add Task {count}</span>
                        <Plus/>
                    </div>
                </div>

            </div>
            <div className="add--section" onClick={() => dispatch(addSection())}>
                <span>Add section</span>
               <Plus/>
            </div>

        </div>
      </main>
    </div>
  );
}

export default App;
