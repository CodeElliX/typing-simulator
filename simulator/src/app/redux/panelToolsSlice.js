import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    textRight: 'Пробіл',
    textLeft: 'Натисніть',
}

export const panelToolsSlice = createSlice({
    name: 'panelTools',
    initialState,
    reducers: {
        setTextRight: (state, actions) => {
            state.textRight = actions.payload;
        },
        setTextLeft: (state, actions) => {
            state.textLeft = actions.payload;
        },
    }
})

export const { setTextRight, setTextLeft } = panelToolsSlice.actions;
export default panelToolsSlice.reducer;