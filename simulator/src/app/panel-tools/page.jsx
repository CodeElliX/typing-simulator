"use client"
import Image from 'next/image'
import styles from './panel-tools.module.css';
import left from './../../../public/left.png'
import right from './../../../public/right.png'
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Timer from '../timer/page';
import Keyboard from '../keyboard/page';
import ModalWarning from '../modal-warning/page';
import { text } from '../utils/text'

const PanelTools = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PanelToolsContent />
        </Suspense>
    );
};


// useEffect(() => {

//     const firstChar = textRight.charAt(0);

//     const handleKeyDown = (event) => {
//         setPressedKey(event.key);
//         const pressedKey = event.key;
//         if (event.key === ' ' && started) {
//             setStartTimer(true);
//             setTextLeft('');
//             setTextRight(text[lang]);
//             setStarted(false);
//         } else if (pressedKey == firstChar) {
//             setTextLeft(prevTextLeft => {
//                 const newTextLeft = prevTextLeft + pressedKey;
//                 if (newTextLeft.length > maxTextLength) {
//                     return newTextLeft.slice(1);
//                 }
//                 return newTextLeft;
//             });
//             setTextRight(prevTextRight => prevTextRight.slice(1));
//         } else if (textRight.length === 0) {
//             setTextLeft('Натисніть');
//             setTextRight('Пробіл');
//             setStartTimer(false);
//             setStarted(true);
//             setNullTimer(true);
//             setDialogVisible(true);
//         } else if (!ignoredKeys.includes(pressedKey) && pressedKey !== firstChar) {
//             setDialogVisible(true);
//         }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//         window.removeEventListener('keydown', handleKeyDown);
//     };

// }, [searchParams, textRight]);

const PanelToolsContent = () => {

    const [started, setStarted] = useState(true);
    const [textLeft, setTextLeft] = useState('Натисніть');
    const [textRight, setTextRight] = useState('Пробіл');
    const [pressedKey, setPressedKey] = useState("");
    const [startTimer, setStartTimer] = useState(false);
    const [nullTimer, setNullTimer] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const searchParams = useSearchParams();
    const maxTextLength = 16;
    const lang = searchParams.get('lang');

    const setTimer = lang === "en" || lang === "ru" || lang === "uk";
    const ignoredKeys = [' ', 'Space', 'Shift', 'Control', 'Alt', 'Meta', 'Tab', 'Escape', 'Enter', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Insert', 'Home', 'End', 'PageUp', 'PageDown', 'NumLock'];

    useEffect(() => {
        const handleKeyDown = (event) => {
            const pressedKey = event.key;
            setPressedKey(pressedKey);

            if (event.key === ' ' && started) {
                setStartTimer(true);
                setTextLeft('');
                setTextRight(text[lang]);
                setStarted(false);
            } else if (pressedKey === textRight.charAt(0)) {
                setTextLeft(prevTextLeft => {
                    const newTextLeft = prevTextLeft + pressedKey;
                    return newTextLeft.length > maxTextLength ? newTextLeft.slice(1) : newTextLeft;
                });
                setTextRight(prevTextRight => prevTextRight.slice(1));
            } else if (!ignoredKeys.includes(pressedKey) && pressedKey !== textRight.charAt(0)) {
                // 🔥 Проверяем, совпадает ли раскладка перед открытием окна
                const regEn = /[a-zA-Z]/;
                const regRu = /[а-яА-Я]/;
                const regUk = /[єЄіІїЇаґбвгдежзийклмнопрстуфхцчшщьюяАҐБВГДЕЄЖЗИЙКЛМНОПРСТУФХЦЧШЩЮЯ]/;

                const isEn = regEn.test(textRight) && regEn.test(pressedKey);
                const isRu = regRu.test(textRight) && regRu.test(pressedKey);
                const isUk = regUk.test(textRight) && regUk.test(pressedKey);

                if (!isEn && !isRu && !isUk && !dialogVisible) {
                    setDialogVisible(true);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [textRight, dialogVisible]);

    useEffect(() => {
        setDialogVisible(false);
    }, [textRight]);

    return (
        <div className={styles.key_bourd}>
            {dialogVisible && <ModalWarning setDialogVisible={setDialogVisible} textRight={textRight} pressedKey={pressedKey} />}
            <h1 className={styles.key_bourd__head}></h1>
            {setTimer &&
                <Timer startTimer={startTimer} nullTimer={nullTimer} />
            }
            <div id={styles.stroke}>
                <div className={styles.left_side}>{textLeft}</div>
                <div className={styles.right_side}>{textRight}</div>
            </div>
            <div className={styles.instrument_panel}>
                <div className={styles.pointer_with_left_hand}>
                    <Image src={left} alt="left-hand" className={styles.right_hand} />
                    <span className={`${styles.pointer} ${styles.pointer_l_hand}`}></span>
                </div>
                <Keyboard lang={lang} />
                <div className={styles.pointer_with_right_hand}>
                    <Image src={right} alt="right-hand" className={styles.right_hand} />
                    <span className={`${styles.pointer} ${styles.pointer_r_hand}`}></span>
                </div>
            </div>
        </div>
    )
}

export default PanelTools;