"use client";
import Image from 'next/image';
import coala from '../../../public/coalDence.png';
import styles from './education.module.css';
import { useState } from 'react';
import EducationalLessons from '../educational-lessons/page';


const Education = () => {

    const [lang, setLang] = useState('en');
    const [isClick, setClick] = useState(false);

    const languageSelectionHandler = (selectedLanguage) => {
        setClick(true);
        setLang(selectedLanguage);
    }
    console.log(isClick)
    return (
        <div className={styles.wrap}>
            {!isClick && (
                <div className={styles.language_selection}>
                    <h1>Тут ви можете опанувати техніку сліпого друку. Оберіть мову:</h1>
                    <section className={`${styles.uk} ${styles.speed_lang_card}`}>
                        <h3>Тренуватися: <span>українською</span></h3>
                        <button className={styles.main__btn} onClick={() => languageSelectionHandler('uk')}>UK</button>
                        <Image src={coala} alt="coalla dence" />
                    </section>
                    <section className={`${styles.en} ${styles.speed_lang_card}`}>
                        <h3>Тренуватися: <span>англійською</span></h3>
                        <button className={styles.main__btn} onClick={() => languageSelectionHandler('en')}>EN</button>
                        <Image src={coala} alt="coalla dence" />
                    </section>
                    <section className={`${styles.ru} ${styles.speed_lang_card}`}>
                        <h3>Тренуватися: <span>російською</span></h3>
                        <button className={styles.main__btn} onClick={() => languageSelectionHandler('ru')}>RU</button>
                        <Image src={coala} alt="coalla dence" />
                    </section>
                </div>
            )}
            <div className={styles.lessons}>{isClick && <EducationalLessons lang={lang} />}</div>
        </div>
    )
}

export default Education;



