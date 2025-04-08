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
import { useDispatch, useSelector } from 'react-redux';
import { setStartTimer, setNullTimer, setInitialCharCount } from '../redux/timerSlice';
import { setTextRight, setTextLeft, setPressedKey, setStarted, setLang } from '../redux/panelToolsSlice';

const PanelTools = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PanelToolsContent />
        </Suspense>
    );
};

const PanelToolsContent = () => {
    const textRight = useSelector(state => state.panelTools.textRight);
    const textLeft = useSelector(state => state.panelTools.textLeft);
    const currentColor = useSelector(state => state.panelTools.currentColorPressedKey);
    const started = useSelector(state => state.panelTools.started);
    const lang = useSelector(state => state.panelTools.lang);
    const dispatch = useDispatch();
    const [modalResultOpen, setModalResultOpen] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [leftPointer, setLeftPointer] = useState(null);
    const [rightPointer, setRightPointer] = useState(null);
    const maxTextLength = 16;
    const searchParams = useSearchParams();
    const setTimer = lang === "en" || lang === "ru" || lang === "uk";
    const ignoredKeys = [' ', 'Space', 'Shift', 'Control', 'Alt', 'Meta', 'Tab', 'Escape', 'Enter', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Insert', 'Home', 'End', 'PageUp', 'PageDown', 'NumLock'];

    const fingerPositions = {
        leftHand: {
            little: { left: 7, top: 196, color: 'rgb(179, 178, 255)' },
            ring: { left: 33, top: 168, color: 'rgb(255, 221, 179)' },
            middle: { left: 73, top: 155, color: 'rgb(179, 255, 204)' },
            index: { left: 114, top: 165, color: 'rgb(201, 200, 255)' },
            thumb: { left: 150, top: 235, color: 'rgb(255, 209, 255)' }
        },
        rightHand: {
            little: { left: 149, top: 196, color: 'rgb(192, 194, 255)' },
            ring: { left: 123, top: 168, color: 'rgb(255, 179, 179)' },
            middle: { left: 83, top: 156, color: 'rgb(155, 153, 255)' },
            index: { left: 42, top: 165, color: 'rgba(154, 72, 198, 0.5)' },
            thumb: { left: 8, top: 235, color: 'rgb(255, 209, 255)' }
        }
    };

    useEffect(() => {
        const currentLang = searchParams.get('lang');
        dispatch(setLang(currentLang));
        dispatch(setTextLeft('Натисніть'));
        dispatch(setTextRight('Пробіл'));
        dispatch(setStarted(true));
        dispatch(setStartTimer(false));
        dispatch(setNullTimer(false));
    }, [searchParams.get('lang')]);

    useEffect(() => {
        if (!currentColor || textRight === 'Пробіл') {
            setLeftPointer(null);
            setRightPointer(null);
            return;
        }

        let foundLeft = null;
        let foundRight = null;

        for (const finger in fingerPositions.leftHand) {
            if (fingerPositions.leftHand[finger].color === currentColor) {
                foundLeft = fingerPositions.leftHand[finger];
            }
        }

        for (const finger in fingerPositions.rightHand) {
            if (fingerPositions.rightHand[finger].color === currentColor) {
                foundRight = fingerPositions.rightHand[finger];
            }
        }

        setLeftPointer(foundLeft);
        setRightPointer(foundRight);
    }, [currentColor, textRight]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key;
            dispatch(setPressedKey(key));

            if ((key === ' ' && started) || (key === ' ' && textRight === 'Пробіл')) {
                const langText = text[lang] || '';
                dispatch(setInitialCharCount(langText.length));
                dispatch(setStartTimer(true));
                dispatch(setTextLeft(''));
                dispatch(setTextRight(langText));
                dispatch(setStarted(false));
            }

            else if (textRight.length === 0 && key === ' ') {
                dispatch(setStartTimer(false));
                dispatch(setNullTimer(true));
                dispatch(setStarted(false));
                dispatch(setTextLeft('Натисніть'));
                dispatch(setTextRight('Пробіл'));
                setModalResultOpen(true);
            }

            else if (key === textRight.charAt(0)) {
                const newTextLeft = (textLeft + key).slice(-maxTextLength);
                dispatch(setTextLeft(newTextLeft));
                dispatch(setTextRight(textRight.slice(1)));
            }

            else if (
                !ignoredKeys.includes(key) &&
                key !== textRight.charAt(0) &&
                !(/\s/.test(textRight.charAt(0))) &&
                textRight.length
            ) {
                const regEn = /[a-zA-Z]/;
                const regRu = /[а-яА-ЯёЁ]/;
                const regUk = /[єЄіІїЇаґАҐ]/;

                const isEn = regEn.test(textRight.charAt(0)) && regEn.test(key);
                const isRu = regRu.test(textRight.charAt(0)) && regRu.test(key);
                const isUk = regUk.test(textRight.charAt(0)) && regUk.test(key);

                if (!isEn && !isRu && !isUk) {
                    setDialogVisible(true);
                } else if (textRight.length === 0) {
                    dispatch(setStartTimer(false));
                    dispatch(setNullTimer(false));
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [textRight, textLeft, lang, started, dispatch]);

    return (
        <div className={styles.key_bourd}>
            {dialogVisible && (
                <ModalWarning setDialogVisible={setDialogVisible} />
            )}
            {setTimer &&
                <Timer />
            }
            <div id={styles.stroke}>
                <div className={styles.left_side}>{textLeft}</div>
                <div className={styles.right_side}>{textRight}</div>
            </div>
            <div className={styles.instrument_panel}>
                <div className={styles.pointer_with_left_hand}>
                    <Image src={left} alt="left-hand" className={styles.right_hand} />
                    {leftPointer && (
                        <span className={`${styles.pointer} ${styles.pointer_l_hand}`}
                            style={{
                                left: `${leftPointer.left}px`,
                                top: `${leftPointer.top}px`,
                            }}
                        ></span>
                    )}
                </div>
                <Keyboard lang={lang} />
                <div className={styles.pointer_with_right_hand}>
                    {rightPointer && (
                        <span className={`${styles.pointer} ${styles.pointer_r_hand}`}
                            style={{
                                left: `${rightPointer.left}px`,
                                top: `${rightPointer.top}px`,
                            }}
                        ></span>
                    )}
                    <Image src={right} alt="right-hand" className={styles.right_hand} />
                </div>
            </div>
            {modalResultOpen && (
                <ModalResult setModalResultOpen={setModalResultOpen} />
            )}
        </div>
    )
}

export default PanelTools;
