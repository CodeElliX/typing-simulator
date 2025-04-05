"use client";
import { useSelector } from 'react-redux';
import styles from './modal-result.module.css';

const ModalResult = (props) => {

    const counter = useSelector(state => state.timer.counter);
    const level = useSelector(state => state.timer.level);
    const typingSpeedResult = useSelector(state => state.timer.typingSpeedResult);

    const closeDialog = () => {
        props.setModalResultOpen(false);
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className={styles.modal__wrap}>
            <div className={styles.modal}>
                <span className={styles.clouse_modal} onClick={closeDialog}>🞬</span>
                <div className={styles.modal_text}>
                    <span className={styles.speed_tittle}>
                        Швидкість друку:
                        <p className={styles.speed}>{typingSpeedResult} зн/хв</p>
                    </span>
                    <span>
                        Пройдено за:
                        <p className={styles.finish_time}>{formatTime(counter)}</p>
                    </span>
                    <span className={styles.level}>
                        Рівень:
                        <p className={styles.your_level}>{level}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ModalResult;