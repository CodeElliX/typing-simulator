import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    startTimer: false,
    nullTimer: true,
    counter: 0,
    level: '',
    typingSpeedResult: '',
    initialCharCount: 0,
}

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setStartTimer: (state, actions) => {
            state.startTimer = actions.payload;
        },
        setNullTimer: (state, actions) => {
            state.nullTimer = actions.payload;
        },
        setCounter: (state, actions) => {
            state.counter = actions.payload;
        },
        setLevel: (state, actions) => {
            state.level = actions.payload;
        },
        setTypingSpeedResult: (state, actions) => {
            state.typingSpeedResult = actions.payload;
        },
        setInitialCharCount: (state, action) => {
            state.initialCharCount = action.payload;
        },
    }
});

export const { setStartTimer, setNullTimer, setCounter, setLevel, setTypingSpeedResult, setInitialCharCount } = timerSlice.actions;

export default timerSlice.reducer;
