import styles from './keyboard.module.css';

const Keyboard = (props) => {
    const baseLayouts = {
        ru: [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '🠐'],
            ['TAB', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\'],
            ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'ENTER'],
            ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'Shift'],
            [' ']
        ],
        uk: [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '🠐'],
            ['TAB', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'І', '\\'],
            ['Caps Lock', 'Ф', 'І', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Є', 'ENTER'],
            ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'Shift'],
            [' ']
        ],
        en: [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '🠐'],
            ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
            ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
            ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
            [' ']
        ]
    };

    // Получаем основное название языка (например, ru_less3 → ru)
    const baseLang = props.lang?.split('_')[0];

    // Выбираем соответствующую раскладку
    const layout = baseLayouts[baseLang] || baseLayouts.en;

    return (
        <div className={styles.keyboard}>
            <div className={styles.buttons}>
                {layout.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.string}>
                        {row.map((key, index) => {
                            return (
                                <div key={index} className={`${styles.btn} ${styles[`key_${rowIndex}_${index}`]}`}>
                                    {key}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Keyboard;