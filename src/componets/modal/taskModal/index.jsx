import React from 'react';
import ModalWrapper from "../index";
import {ReactComponent as Delete} from '../../../images/icons/delete.svg';

const TaskContextModal = ({...props}) => {
    return (
        <ModalWrapper {...props}>
            <ul className="box--list">
                <li className="box--item">
                    <input type="text" />
                </li>
                <li className="box--item">
                    <Delete/>
                    <span className="delete--text">Delete task</span>
                </li>
            </ul>
        </ModalWrapper>
    );
};

export default TaskContextModal;