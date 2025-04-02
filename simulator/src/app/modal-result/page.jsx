"use client";
import styles from './modal-result.module.css';

const ModalResult = (props) => {

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
                        <p className={styles.speed}>{props.typingSpeedResult} зн/хв</p>
                    </span>
                    <span>
                        Пройдено за:
                        <p className={styles.finish_time}>{formatTime(props.counter)}</p>
                    </span>
                    <span className={styles.level}>
                        Рівень:
                        <p className={styles.your_level}>{props.level}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ModalResult;