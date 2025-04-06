import { configureStore } from "@reduxjs/toolkit";
import timer from './timerSlice.js'
import panelTools from './panelToolsSlice.js'

export const store = configureStore({
    reducer: {
        timer,
        panelTools,
    }
})