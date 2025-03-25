"use client"
import styles from './modal-warning.module.css';
import { useRef } from 'react';

const ModalWarning = () => {
    const dialogRef = useRef(null);
    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }
    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }
    return (
        <>
            <dialog ref={dialogRef} className={styles.modal_warning}>
                <span className={styles.warning_close_modal} onClick={closeDialog}>🞬</span>
                <div className={styles.warning_modal_text}>
                    Змініть розкладку клавіатури на: <span className={styles.change_modal_language}></span>
                </div>
            </dialog>
        </>
    )
}

export default ModalWarning;