import React from 'react';
import ModalWrapper from "../index";
import {ReactComponent as Delete} from '../../../images/icons/delete.svg';
import {useDispatch} from "react-redux";
import {deleteTask} from "../../../redux/slices/sectionSlice";

const TaskContextModal = ({taskId,sectionId, ...props}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTask({sectionId, taskId}) )
        props.onClick()
    }

    return (
        <ModalWrapper {...props}>
            <ul className="box--list">
                <li className="box--item">
                    <input type="text" />
                </li>
                <li className="box--item" onClick={handleDelete}>
                    <Delete/>
                    <span className="delete--text">Delete task</span>
                </li>
            </ul>
        </ModalWrapper>
    );
};

export default TaskContextModal;