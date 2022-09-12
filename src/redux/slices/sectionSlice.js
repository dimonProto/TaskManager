import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const sectionSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addSection: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },

    },
})

// Action creators are generated for each case reducer function
export const { addSection } = sectionSlice.actions

export default sectionSlice.reducer