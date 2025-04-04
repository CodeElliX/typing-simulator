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
import ModalResult from '../modal-result/page';

const PanelTools = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PanelToolsContent />
        </Suspense>
    );
};

const PanelToolsContent = () => {
    console.log("render");


    const [started, setStarted] = useState(true);
    const [textLeft, setTextLeft] = useState('Натисніть');
    const [textRight, setTextRight] = useState('Пробіл');
    const [pressedKey, setPressedKey] = useState("");
    const [startTimer, setStartTimer] = useState(false);
    const [nullTimer, setNullTimer] = useState(true);
    const [modalResultOpen, setModalResultOpen] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [level, setLevel] = useState("");
    const [typingSpeedResult, setTypingSpeedResult] = useState("");
    const [counter, setCounter] = useState(0);
    const searchParams = useSearchParams();
    const maxTextLength = 16;
    const lang = searchParams.get('lang');

    const setTimer = lang === "en" || lang === "ru" || lang === "uk";
    const ignoredKeys = [' ', 'Space', 'Shift', 'Control', 'Alt', 'Meta', 'Tab', 'Escape', 'Enter', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Insert', 'Home', 'End', 'PageUp', 'PageDown', 'NumLock'];


    const [pointerPosition, setPointerPosition] = useState(null);

    const fingerPositions = {
        leftHand: {
            little: { left: 7, top: 196, color: 'rgb(197, 199, 255)' },
            ring: { left: 33, top: 168, color: 'rgb(251, 229, 202)' },
            middle: { left: 73, top: 155, color: 'rgb(197, 253, 219)' },
            index: { left: 114, top: 165, color: 'rgb(212, 213, 254)' },
            thumb: { left: 150, top: 235, color: 'rgb(251, 221, 255)' }
        },
        rightHand: {
            little: { left: 149, top: 196, color: 'rgb(192, 194, 255)' },
            ring: { left: 123, top: 168, color: 'rgb(251, 200, 202)' },
            middle: { left: 83, top: 156, color: 'rgb(180, 181, 255)' },
            index: { left: 42, top: 165, color: 'rgb(209, 186, 235)' },
            thumb: { left: 8, top: 235, color: 'rgb(251, 221, 255)' }
        }
    };


    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key;
            setPressedKey(key);
            if (key === ' ' && started || key === " " && textRight === "Пробіл") {
                setStartTimer(true);
                setTextLeft('');
                setTextRight(text[lang]);
                setStarted(false);
            } else if (textRight.length === 0 && key === " ") {
                setStartTimer(false);
                setNullTimer(true);
                setStarted(false);
                setTextLeft('Натисніть');
                setTextRight('Пробіл')
                setModalResultOpen(true);
                console.log("finish")
            } else if (key === textRight.charAt(0)) {
                setTextLeft(prevTextLeft => {
                    const newTextLeft = prevTextLeft + key;
                    return newTextLeft.length > maxTextLength ? newTextLeft.slice(1) : newTextLeft;
                });
                setTextRight(prevTextRight => prevTextRight.slice(1));
            } else if (!ignoredKeys.includes(key) && key !== textRight.charAt(0) &&
                !(/\s/.test(textRight.charAt(0))) && textRight.length) {
                const regEn = /[a-zA-Z]/;
                const regRu = /[а-яА-Я]/;
                const regUk = /[єЄіІїЇаґбвгдежзийклмнопрстуфхцчшщьюяАҐБВГДЕЄЖЗИЙКЛМНОПРСТУФХЦЧШЩЮЯ]/;

                const isEn = regEn.test(textRight.charAt(0)) && regEn.test(key);
                const isRu = regRu.test(textRight.charAt(0)) && regRu.test(key);
                const isUk = regUk.test(textRight.charAt(0)) && regUk.test(key);

                if (!isEn && !isRu && !isUk) {
                    setDialogVisible(true);
                } else if (textRight.length === 0) {
                    setStartTimer(false);
                    setNullTimer(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [textRight, dialogVisible]);

    return (
        <div className={styles.key_bourd}>
            {dialogVisible && (
                <ModalWarning setDialogVisible={setDialogVisible} textRight={textRight} pressedKey={pressedKey} />
            )}
            <h1 className={styles.key_bourd__head}></h1>
            {setTimer &&
                <Timer startTimer={startTimer} nullTimer={nullTimer} textRight={textRight} setLevel={setLevel} setTypingSpeedResult={setTypingSpeedResult} setCounter={setCounter} counter={counter} />
            }
            <div id={styles.stroke}>
                <div className={styles.left_side}>{textLeft}</div>
                <div className={styles.right_side}>{textRight}</div>
            </div>
            <div className={styles.instrument_panel}>
                <div className={styles.pointer_with_left_hand}>
                    <Image src={left} alt="left-hand" className={styles.right_hand} />
                    {pointerPosition && (
                        <span className={`${styles.pointer} ${styles.pointer_l_hand}`}
                            style={{
                                left: `${pointerPosition.left}px`,
                                top: `${pointerPosition.top}px`,
                                backgroundColor: pointerPosition.color
                            }}
                        ></span>
                    )}
                </div>
                <Keyboard lang={lang} activeKey={pressedKey} textRight={textRight} />
                <div className={styles.pointer_with_right_hand}>
                    {pointerPosition && (
                        <span className={`${styles.pointer} ${styles.pointer_r_hand}`}
                            style={{
                                left: `${pointerPosition.left}px`,
                                top: `${pointerPosition.top}px`,
                                backgroundColor: pointerPosition.color
                            }}
                        ></span>
                    )}
                    <Image src={right} alt="right-hand" className={styles.right_hand} />
                </div>
            </div>
            {modalResultOpen && (
                <ModalResult setModalResultOpen={setModalResultOpen} level={level} typingSpeedResult={typingSpeedResult} counter={counter} />
            )}
        </div>
    )
}

export default PanelTools;

//Left hand:
//little finger: left: 7px; top: 196px; color: rgb(197, 199, 255)
//ring finger: left: 33px; top: 168px; color: rgb(251, 229, 202)
//middle finger: left: 73px; top: 155px; color: rgb(197, 253, 219)
//index finger: left: 114px; top: 165px; color: rgb(212, 213, 254)
//big finger: left: 150px; top: 235px; color: rgb(251, 221, 255)

//Right hand:
//little finger: left: 149px; top: 196px; color: rgb(192, 194, 255)
//ring finger: left: 123px; top: 168px; color: rgb(251, 200, 202)
//middle finger: left: 83px; top: 156px; color: rgb(180, 181, 255)
//index finger: left: 42px; top: 165px; color: rgb(209, 186, 235)
//big finger: left: 8px; top: 235px; color: rgb(251, 221, 255)
