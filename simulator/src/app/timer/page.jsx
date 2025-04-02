"use client";
import { useEffect, useState } from 'react';
import styles from './timer.module.css';

const Timer = (props) => {
    const [time, setTime] = useState('00:00');
    const [initialCharCount, setInitialCharCount] = useState(0);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const typingSpeed = props.counter > 0 ? Math.round((initialCharCount / props.counter) * 60) : 0;

    const determineLevel = (speed) => {
        if (speed >= 170) return "високий";
        if (speed > 80) return "середній";
        return "початковий";
    };

    useEffect(() => {
        if (!props.startTimer) return;
        if (props.nullTimer) {
            setTime('00:00');
            props.setCounter(0);
            setInitialCharCount(props.textRight.length);
        }

        const timer = setInterval(() => {
            props.setCounter(prevCounter => {
                const newCounter = prevCounter + 1;
                setTime(formatTime(newCounter));
                return newCounter;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [props.startTimer, props.setLevel]);

    useEffect(() => {
        props.setLevel(determineLevel(typingSpeed));
        props.setTypingSpeedResult(typingSpeed);
    }, [typingSpeed]);

    return (
        <>
            <div className={`${styles.timer} ${!props.startTimer ? styles.finish : ""}`}>
                <span className={styles.time}>{time}</span>
            </div>
            {/* <div>Швидкість друку: {typingSpeed} символів/хв</div>
            <div>Пройдено за {props.counter} секунд</div>
            <div>Рівень: {determineLevel(typingSpeed)}</div> */}
        </>
    );
};

export default Timer;
