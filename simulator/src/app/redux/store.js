import { configureStore } from "@reduxjs/toolkit";
import timer from './timerSlice.js'

export const store = configureStore({
    reducer: {
        timer,
    }
})