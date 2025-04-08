"use client";
import { useEffect, useState } from 'react';
import styles from './timer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCounter, setLevel, setTypingSpeedResult } from '../redux/timerSlice';

const Timer = (props) => {
    const [time, setTime] = useState('00:00');
    const initialCharCount = useSelector(state => state.timer.initialCharCount);
    const startTimer = useSelector(state => state.timer.startTimer);
    const nullTimer = useSelector(state => state.timer.nullTimer);
    const counter = useSelector(state => state.timer.counter);
    const textRight = useSelector(state => state.panelTools.textRight);
    const dispatch = useDispatch();

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const typingSpeed = counter > 0 ? Math.round((initialCharCount / counter) * 60) : 0;

    const determineLevel = (speed) => {
        if (speed >= 170) return "високий";
        if (speed > 80) return "середній";
        return "початковий";
    };

    useEffect(() => {
        if (!startTimer) return;
        if (nullTimer) {
            setTime('00:00');
            dispatch(setCounter(0));
        }
        let current = 0;
        const timer = setInterval(() => {
            current += 1;
            dispatch(setCounter(current));
            setTime(formatTime(current));
        }, 1000);

        return () => clearInterval(timer);
    }, [startTimer, nullTimer]);

    useEffect(() => {
        dispatch(setLevel(determineLevel(typingSpeed)));
        dispatch(setTypingSpeedResult(typingSpeed));
    }, [typingSpeed]);

    return (
        <>
            <div className={`${styles.timer} ${!startTimer ? styles.finish : ""}`}>
                <span className={styles.time}>{time}</span>
            </div>
        </>
    );
};

export default Timer;
