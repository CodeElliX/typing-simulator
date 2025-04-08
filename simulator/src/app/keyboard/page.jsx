"use client";
import { useDispatch, useSelector } from 'react-redux';
import styles from './keyboard.module.css';
import { useEffect, useRef } from 'react';
import { setCurrentColorPressedKey } from '../redux/panelToolsSlice';

const Keyboard = (props) => {
    const dispatch = useDispatch();
    const activeKeyRef = useRef(null);

    const textRight = useSelector(state => state.panelTools.textRight);
    let activeKey;
    if (textRight && textRight !== "Пробіл") {
        activeKey = textRight.charAt(0);
    } else {
        activeKey = "";
    }

    useEffect(() => {
        if (activeKeyRef.current) {
            const computedStyle = window.getComputedStyle(activeKeyRef.current);
            const bgColor = computedStyle.backgroundColor;
            dispatch(setCurrentColorPressedKey(bgColor))
        }
    }, [activeKey])

    const isUpperCase = activeKey === activeKey.toUpperCase() && isNaN(activeKey);

    const shiftLeft = new Set(["Y", "U", "I", "O", "P", "H", "J", "K", "L", "B", "N", "M", "^", "&", "*", "(", ")", "_", "+", "\"", ":", "<", ">", "?", "|", "{", "}", "Н", "Г", "I", "Щ", "З", "Р", "О", "Л", "Д", "И", "Т", "Ь", "Х", "Ж", "Э", "Б", "Ю", "Ї", "Є"]);
    const shiftRight = new Set(["T", "R", "E", "W", "Q", "G", "F", "D", "S", "A", "V", "C", "X", "Z", "Е", "К", "У", "Ц", "Й", "П", "А", "В", "Ё", "Ф", "М", "С", "Ч", "Я", "І", "%", "$", "#", "@", "!", "~"]);

    const baseLang = props.lang?.split('_')[0];
    const currentShiftLeft = new Set(shiftLeft);
    if (baseLang === 'ru' || baseLang === 'uk') {
        currentShiftLeft.add(',');
        currentShiftLeft.add('/');
    }

    const highlightShiftLeft = isUpperCase && currentShiftLeft.has(activeKey);
    const highlightShiftRight = isUpperCase && shiftRight.has(activeKey);

    const baseLayouts = {
        uk: [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '🠐'],
            ['TAB', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ї', '\\'],
            ['Caps Lock', 'Ф', 'І', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Є', 'ENTER'],
            ['ShiftLeft', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'ShiftRight'],
            [' ']
        ],
        ru: [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '🠐'],
            ['TAB', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\'],
            ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'ENTER'],
            ['ShiftLeft', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'ShiftRight'],
            [' ']
        ],
        en: [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '🠐'],
            ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
            ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
            ['ShiftLeft', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'ShiftRight'],
            [' ']
        ]
    };

    if (textRight.charAt(0) === '!') {
        baseLayouts.en[0][1] = '!';
        baseLayouts.ru[0][1] = '!';
        baseLayouts.uk[0][1] = '!';
    } else if (textRight.charAt(0) === '+') {
        baseLayouts.en[0][12] = '+';
        baseLayouts.ru[0][12] = '+';
        baseLayouts.uk[0][12] = '+';
    } else if (textRight.charAt(0) === '<') {
        baseLayouts.en[3][8] = '<';
        baseLayouts.ru[3][8] = '<';
        baseLayouts.uk[3][8] = '<';
    } else if (textRight.charAt(0) === '>') {
        baseLayouts.en[3][9] = '>';
        baseLayouts.ru[3][9] = '>';
        baseLayouts.uk[3][9] = '>';
    } else if (textRight.charAt(0) === '?') {
        baseLayouts.en[3][10] = '?';
        baseLayouts.ru[0][7] = '?';
        baseLayouts.uk[0][7] = '?';
    } else if (textRight.charAt(0) === '{') {
        baseLayouts.en[1][11] = '{';
        baseLayouts.ru[1][11] = '{';
        baseLayouts.uk[1][11] = '{';
    } else if (textRight.charAt(0) === '}') {
        baseLayouts.en[1][12] = '}';
        baseLayouts.ru[1][12] = '}';
        baseLayouts.uk[1][12] = '}';
    } else if (textRight.charAt(0) === '(') {
        baseLayouts.en[0][9] = '(';
        baseLayouts.ru[0][9] = '(';
        baseLayouts.uk[0][9] = '(';
    } else if (textRight.charAt(0) === ')') {
        baseLayouts.en[0][10] = ')';
        baseLayouts.ru[0][10] = ')';
        baseLayouts.uk[0][10] = ')';
    } else if (textRight.charAt(0) === ':') {
        baseLayouts.en[2][10] = ':';
        baseLayouts.ru[0][6] = ':';
        baseLayouts.uk[0][6] = ':';
    } else if (textRight.charAt(0) === '|') {
        baseLayouts.en[1][13] = '|';
        baseLayouts.ru[1][13] = '|';
        baseLayouts.uk[1][13] = '|';
    } else if (textRight.charAt(0) === '"') {
        baseLayouts.en[2][11] = '"';
        baseLayouts.ru[0][2] = '"';
        baseLayouts.uk[0][2] = '"';
    } else if (textRight.charAt(0) === '@') {
        baseLayouts.en[0][2] = '@';
        baseLayouts.ru[0][2] = '@';
        baseLayouts.uk[0][2] = '@';
    } else if (textRight.charAt(0) === '_') {
        baseLayouts.en[0][11] = '_';
        baseLayouts.ru[0][11] = '_';
        baseLayouts.uk[0][11] = '_';
    } else if (textRight.charAt(0) === '#') {
        baseLayouts.en[0][3] = '#';
        baseLayouts.ru[0][3] = '#';
        baseLayouts.uk[0][3] = '#';
    } else if (textRight.charAt(0) === '$') {
        baseLayouts.en[0][4] = '$';
        baseLayouts.ru[0][4] = '$';
        baseLayouts.uk[0][4] = '$';
    } else if (textRight.charAt(0) === '%') {
        baseLayouts.en[0][5] = '%';
        baseLayouts.ru[0][5] = '%';
        baseLayouts.uk[0][5] = '%';
    } else if (textRight.charAt(0) === '*') {
        baseLayouts.en[0][8] = '*';
        baseLayouts.ru[0][8] = '*';
        baseLayouts.uk[0][8] = '*';
    } else if (textRight.charAt(0) === '^') {
        baseLayouts.en[0][6] = '^';
        baseLayouts.ru[0][6] = '^';
        baseLayouts.uk[0][6] = '^';
    } else if (textRight.charAt(0) === '&') {
        baseLayouts.en[0][7] = '&';
        baseLayouts.ru[0][7] = '&';
        baseLayouts.uk[0][7] = '&';
    } else if (textRight.charAt(0) === ',') {
        baseLayouts.ru[3][10] = ',';
        baseLayouts.uk[3][10] = ',';
    } else if (textRight.charAt(0) === '/') {
        baseLayouts.ru[1][13] = '/';
        baseLayouts.uk[1][13] = '/';
    }

    const layout = baseLayouts[baseLang] || baseLayouts.en;

    return (
        <div className={styles.keyboard}>
            <div className={styles.buttons}>
                {layout.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.string}>
                        {row.map((key, index) => {
                            const isActive = key.toLowerCase() === activeKey.toLowerCase();
                            const isShiftActive = (key === 'ShiftLeft' && highlightShiftLeft) || (key === 'ShiftRight' && highlightShiftRight);

                            return (
                                <div
                                    ref={isActive ? activeKeyRef : null}
                                    key={index}
                                    className={`${styles.btn} ${styles[`key_${rowIndex}_${index}`]} ${isActive || isShiftActive ? styles.activeKey : ''}`}
                                >
                                    {key.includes('Shift') ? 'Shift' : key}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;

