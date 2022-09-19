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
                tasks: []
            })
        },
        createTask: (state, action) => {
           const targetSection = state.sections.find(el => el.id === action.payload.sectionId)
            targetSection.tasks.push({
                id: uid(),
                name: 'New task'
            })
        },
    },
})

// Action creators are generated for each case reducer function
export const { addSection, createTask } = sectionSlice.actions

export default sectionSlice.reducer