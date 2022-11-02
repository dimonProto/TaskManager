import React from 'react';
import ModalWrapper from "../index";
import {ReactComponent as Delete} from '../../../images/icons/delete.svg';
import {useDispatch} from "react-redux";
import {changeTaskName, deleteTask} from "../../../redux/slices/sectionSlice";

const TaskContextModal = ({taskId,sectionId,taskName,setTaskName, ...props}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTask({sectionId, taskId}) )
        props.onClick()
    }

    const changeName = (e) => {
        dispatch(changeTaskName({sectionId, taskId, taskName: e.target.value}))
        setTaskName(e.target.value)
    }
    return (
        <ModalWrapper {...props}>
            <ul className="box--list">
                <li className="box--item">
                    <input type="text" value={taskName} onChange={changeName} />
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