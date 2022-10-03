import React, {useState} from 'react';
import ModalWrapper from "../index";
 import {ReactComponent as Delete} from '../../../images/icons/delete.svg';
 import {ReactComponent as Plus} from '../../../images/icons/plus.svg';
import {COLORS} from "../../../utils/constant";
import {useDispatch} from "react-redux";
import {changeColorSection} from "../../../redux/slices/sectionSlice";

const SectionContextModal = ({addTask,sectionId, color:sectionColor, ...props}) => {
    const dispatch = useDispatch()
    const [currentColor] = useState(sectionColor)
    const handleColor = (color) => {
        dispatch(changeColorSection({sectionId:sectionId ,sectionColor: color}))
    }
    console.log(sectionId,'sectionId')
    return (
        <ModalWrapper {...props}>
            <ul className="box--list">
                <li className="box--item" onClick={addTask}>
                    <Plus/>
                    <span className="delete--text">Add task</span>
                </li>
                <li className="box--item">
                    <input type="text" />
                </li>
                <li className="box--item">
                    <ul className="colors" >
                        {currentColor}
                        {COLORS.map((color, idx) => {
                            return (
                                <li className={`colors--item ${currentColor === color && 'active'}`}
                                    onClick={() => handleColor(color, idx)}
                                    key={idx} style={{background: `${color}`}}></li>
                            )
                        })}
                    </ul>
                </li>
                <li className="box--item">
                    <Delete/>
                    <span className="delete--text">Delete section</span>
                </li>
            </ul>
        </ModalWrapper>
    );
};

export default SectionContextModal;