"use client"
import { useState, useEffect } from 'react';
import styles from './modal-warning.module.css';
import { useSelector } from 'react-redux';

const ModalWarning = (props) => {

    const [textLang, setTextLang] = useState("");
    const textRight = useSelector(state => state.panelTools.textRight);
    const pressedKey = useSelector(state => state.panelTools.pressedKey);

    useEffect(() => {
        const regEn = /^[a-zA-Z0-9,().{}<>[\]!:;@#$%^&*+=_"'?`~|\\\-\/]+$/;
        const regRu = /^[а-яА-Я0-9,().{}<>[\]!:;@#$%^&*+=_"'?`~|\\\-\/]+$/;
        const regUk = /^[єЄіІїЇаґбвгдежзийклмнопрстуфхцчшщьюяАҐБВГДЕЄЖЗИЙКЛМНОПРСТУФХЦЧШЩЮЯ0-9,().{}<>[\]!:;@#$%^&*+=_"'`~?|\\\-\/]+$/;

        let detectedLang = "";

        if (regEn.test(textRight.charAt(0)) && !regEn.test(pressedKey)) {
            detectedLang = "англійську";
        } else if (regRu.test(textRight.charAt(0)) && !regRu.test(pressedKey)) {
            detectedLang = "російську";
        } else if (regUk.test(textRight.charAt(0)) && !regUk.test(pressedKey)) {
            detectedLang = "українську";
        }
        if (detectedLang) {
            setTextLang(detectedLang);
            props.setDialogVisible(true);
        }
    }, [pressedKey, textRight]);

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