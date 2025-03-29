"use client"
import { useState, useEffect } from 'react';
import styles from './modal-warning.module.css';

const ModalWarning = (props) => {

    const [textLang, setTextLang] = useState("");

    useEffect(() => {
        if (!props.pressedKey) return;

        const regEn = /^[a-zA-Z0-9,().{}<>[\]!:;@#$%^&*+=_"'?`~|\\\-\/]+$/;
        const regRu = /^[а-яА-Я0-9,().{}<>[\]!:;@#$%^&*+=_"'?`~|\\\-\/]+$/;
        const regUk = /^[єЄіІїЇаґбвгдежзийклмнопрстуфхцчшщьюяАҐБВГДЕЄЖЗИЙКЛМНОПРСТУФХЦЧШЩЮЯ0-9,().{}<>[\]!:;@#$%^&*+=_"'`~?|\\\-\/]+$/;
        //
        let detectedLang = "";
        //
        if (regEn.test(props.textRight) && !regEn.test(props.pressedKey)) {
            detectedLang = "англійську";
        } else if (regRu.test(props.textRight) && !regRu.test(props.pressedKey)) {
            detectedLang = "російську";
        } else if (regUk.test(props.textRight) && !regUk.test(props.pressedKey)) {
            detectedLang = "українську";
        }
        setTextLang(detectedLang);
    }, [props.pressedKey, props.textRight]);

    useEffect(() => {
        props.setDialogVisible(!!textLang);
    }, [textLang, props.setDialogVisible]);

    if (!textLang) return null;

    const closeDialog = () => {
        props.setDialogVisible(false);
    }

    return (
        <div className={styles.warning_modal__wrap}>
            <div className={styles.modal_warning}>
                <span className={styles.warning_close_modal} onClick={closeDialog}>🞬</span>
                <div className={styles.warning_modal_text}>
                    Змініть розкладку клавіатури на: <span className={styles.change_modal_language}>{textLang}</span>
                </div>
            </div>
        </div>
    )
}

export default ModalWarning;