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
import {text} from '../utils/text'

const PanelTools = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PanelToolsContent />
        </Suspense>
    );
};

const PanelToolsContent = () => {

    const [started, setStarted] = useState(true);
    let [textLeft, setTextLeft] = useState('Натисніть');
    let [textRight, setTextRight] = useState('Пробіл');
    const [startTimer, setStartTimer] = useState(false);
    const [nullTimer, setNullTimer] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const searchParams = useSearchParams();
    const maxTextLength = 16;
    const lang = searchParams.get('lang');

    useEffect(() => {

        const firstChar = textRight.charAt(0);

        const handleKeyDown = (event) => {
            const pressedKey = event.key;
            if (event.key === ' ' && started) {
                setStartTimer(true);
                setTextLeft('');
                setTextRight(text[lang]);
                setStarted(false);
            } else if (pressedKey == firstChar) {
                setTextLeft(prevTextLeft => {
                    const newTextLeft = prevTextLeft + pressedKey;
                    if (newTextLeft.length > maxTextLength) {
                        return newTextLeft.slice(1);
                    }
                    return newTextLeft;
                });
                setTextRight(prevTextRight => prevTextRight.slice(1));
            } else if (textRight.length === 0) {
                setTextLeft('Натисніть');
                setTextRight('Пробіл');
                setStartTimer(false);
                setStarted(true);
                setNullTimer(true);
                setDialogVisible(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [searchParams, textRight]);

    return (
        <div className={styles.key_bourd}>
            <ModalWarning />
            {dialogVisible && <ModalWarning />}
            <h1 className={styles.key_bourd__head}></h1>
            <Timer startTimer={startTimer} nullTimer={nullTimer} />
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