"use client";
import { useSelector } from 'react-redux';
import styles from './keyboard.module.css';

const Keyboard = (props) => {

    const textRight = useSelector(state => state.panelTools.textRight);
    let activeKey;
    if (textRight && textRight !== "Пробіл") {
        activeKey = textRight.charAt(0);
    } else {
        activeKey = "";
    }
    const isUpperCase = activeKey === activeKey.toUpperCase() && isNaN(activeKey);

    const shiftLeft = new Set(["Y", "U", "I", "O", "P", "H", "J", "K", "L", "B", "N", "M", "^", "&", "*", "(", ")", "_", "+", "\"", ":", "<", ">", "?", "|", "{", "}", "Н", "Г", "I", "Щ", "З", "Р", "О", "Л", "Д", "И", "Т", "Ь", "Х", "Ж", "Э", "Б", "Ю", "Ї", "Є"]);
    const shiftRight = new Set(["T", "R", "E", "W", "Q", "G", "F", "D", "S", "A", "V", "C", "X", "Z", "Е", "К", "У", "Ц", "Й", "П", "А", "В", "Ё", "Ф", "М", "С", "Ч", "Я", "І", "%", "$", "#", "@", "!", "~"]);

    const highlightShiftLeft = isUpperCase && shiftLeft.has(activeKey);
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

    const baseLang = props.lang?.split('_')[0];
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

