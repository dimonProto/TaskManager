import { createSlice } from '@reduxjs/toolkit'
import {uid} from "uid";
import "../../utils/helpers/index"

const initialState = {
    sections: [],
}

export const sectionSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addSection: (state) => {
            state.sections.push({
                id: uid(),
                tasks: [],
                name: 'New Section',
                color: '#cbcbcb',
            })
        },
        createTask: (state, action) => {
           const targetSection = state.sections.findById( action.payload.sectionId)
            targetSection.tasks.push({
                id: uid(),
                name: 'New task'
            })
        },
        moveTask: (state, {payload}) => {
            const {oldSectionId, newSectionId, task} = payload

            const oldSection = state.sections.findById(oldSectionId)
            const newSection = state.sections.findById(newSectionId)

            if (oldSectionId === newSectionId) {
                const cut = oldSection.tasks.splice(task.oldTaskPosition, 1)[0]
                newSection.tasks.splice(task.newTaskPosition, 0, cut)
            }

            const taskIndex = oldSection.tasks.findIndex(task => task.id === task.taskId)
            const cutOutTask = oldSection.tasks.splice(taskIndex, 1)[0]
            newSection.tasks.push(cutOutTask)
        },
        changeSectionName: (state, action) => {
            const targetSection = state.sections.find(el => el.id === action.payload.sectionId)
            targetSection.name = action.payload.newName
        },
        changeTaskName: (state, action) => {
            const findSection = state.sections.findById(action.payload.sectionId)

            findSection.tasks.map(task => {
                if(task.id === action.payload.taskId){
                    task.name = action.payload.taskName
                }
            })
        },
        changeColorSection: (state, action) => {
            state.sections.map(el => {
                if(el.id === action.payload.sectionId){
                    el.color = action.payload.sectionColor
                }
            })
        },
        deleteSection: (state, action) => {
             state.sections = state.sections.filter(section => section.id !== action.payload)
        },
        deleteTask: (state, action) => {
            const findSection =  state.sections.findById(action.payload.sectionId)

            findSection.tasks =  findSection.tasks.filter(task => task.id !== action.payload.taskId)
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    addSection,
    createTask,
    changeSectionName,
    changeColorSection,
    deleteSection,
    deleteTask,
    changeTaskName,
    moveTask,
} = sectionSlice.actions

export default sectionSlice.reducer