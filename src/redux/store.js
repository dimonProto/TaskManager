import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {sectionReducer} from "./slices/sectionSlice";
export const store = configureStore({
    reducer: {
        section: sectionReducer,
        middleware: ({
            immutableCheck: false
        }),
    },
})

