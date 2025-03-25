import styles from './speed-test.module.css';
import Image from 'next/image';
import coalaDence from './../../../public/coalDence.png';
import Link from 'next/link';


const SpeedTest = () => {

    return (
        <div className={styles.main}>
            <h1 className={styles.speed_lang__header}>Виберіть якою мовою бажаєте пройти тест:</h1>
            <section className={`${styles.uk} ${styles.speed_lang_card}`}>
                <h3>Пройти тест <span>українською</span></h3>
                <Link href="/panel-tools?lang=uk">
                    <button className={styles.main__btn}>UK</button>
                </Link>
                <Image src={coalaDence} alt="coalla dence" />
            </section>
            <section className={`${styles.en} ${styles.speed_lang_card}`}>
                <h3>Пройти тест <span>англійською</span></h3>
                <Link href="/panel-tools?lang=en">
                    <button className={styles.main__btn}>EN</button>
                </Link>
                <Image src={coalaDence} alt="coalla dence" />
            </section>
            <section className={`${styles.ru} ${styles.speed_lang_card}`}>
                <h3>Пройти тест <span>російською</span></h3>
                <Link href="/panel-tools?lang=ru">
                    <button className={styles.main__btn}>RU</button>
                </Link>
                <Image src={coalaDence} alt="coalla dence" />
            </section>
        </div>
    )
}

export default SpeedTest;