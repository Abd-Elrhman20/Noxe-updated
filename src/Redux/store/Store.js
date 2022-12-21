import { configureStore } from "@reduxjs/toolkit"
import firstSliceReducer from "../storeSlices/fristSlice"

export const store = configureStore({
    reducer: {
        first: firstSliceReducer,
    }
})