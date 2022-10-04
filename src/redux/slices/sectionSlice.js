import { createSlice } from '@reduxjs/toolkit'
import {uid} from "uid";

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
           const targetSection = state.sections.find(el => el.id === action.payload.sectionId)
            targetSection.tasks.push({
                id: uid(),
                name: 'New task'
            })
        },
        changeSectionName: (state, action) => {
            const targetSection = state.sections.find(el => el.id === action.payload.sectionId)
            targetSection.name = action.payload.newName
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
            const findSection =  state.sections.find(el => el.id === action.payload.sectionId)
            findSection.tasks =  findSection.tasks.filter(task => task.id !== action.payload.taskId)
        },
    },
})

// Action creators are generated for each case reducer function
export const { addSection, createTask, changeSectionName, changeColorSection, deleteSection, deleteTask } = sectionSlice.actions

export default sectionSlice.reducer