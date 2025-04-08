import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    textRight: 'Пробіл',
    textLeft: 'Натисніть',
    pressedKey: '',
    currentColorPressedKey: '',
    started: true,
    lang: ''
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
        setPressedKey: (state, actions) => {
            state.pressedKey = actions.payload;
        },
        setCurrentColorPressedKey: (state, actions) => {
            state.currentColorPressedKey = actions.payload;
        },
        setStarted: (state, actions) => {
            state.started = actions.payload;
        },
        setLang: (state, actions) => {
            state.lang = actions.payload;
        },
    }
})

export const { setTextRight, setTextLeft, setPressedKey, setCurrentColorPressedKey, setStarted, setLang } = panelToolsSlice.actions;
export default panelToolsSlice.reducer;