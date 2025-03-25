"use client";
import { useEffect, useState } from 'react';
import styles from './timer.module.css';

const Timer = (props) => {

    const [time, setTime] = useState('00:00');
    const [counter, setCounter] = useState(0);

    useEffect(() => {

        if (!props.startTimer) return;
        if (props.nullTimer) {
            setTime('00:00');
        }
        const timer = setInterval(() => {
            setCounter(prevCounter => {
                const newCounter = prevCounter + 1;
                const minutes = Math.floor(newCounter / 60);
                const seconds = newCounter % 60;
                setTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
                return newCounter;
            });
        }, 1000);
        return () => clearInterval(timer);

    }, [props.startTimer])

    return (
        <>
            <div className={styles.timer}><span className={styles.time}>{time}</span></div>
        </>
    )
}

export default Timer;