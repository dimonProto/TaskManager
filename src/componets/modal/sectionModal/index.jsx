import React from 'react';
import ModalWrapper from "../index";
 import {ReactComponent as Delete} from '../../../images/icons/delete.svg';
 import {ReactComponent as Plus} from '../../../images/icons/plus.svg';
import {colors} from "../../../utils/constant";
import {useDispatch, useSelector} from "react-redux";
import {changeColorSection} from "../../../redux/slices/sectionSlice";

const SectionContextModal = ({addTask,sectionId, ...props}) => {
   const sectionColor = useSelector((state) => state.section.sections)
    const dispatch = useDispatch()
    console.log(sectionColor)
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
                        {colors.map((color, idx) => {
                            return (
                                <li className={`colors--item ${sectionColor.map(el => el.color === color && 'active') } ` }
                                    onClick={() => dispatch(changeColorSection({sectionId:sectionId ,sectionColor: color}))}
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