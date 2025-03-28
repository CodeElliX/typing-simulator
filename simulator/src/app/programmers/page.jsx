"use client"
import styles from "./programmers.module.css";
import Link from "next/link";

const Programmers = () => {

    return (
        <div className={styles.menu_programming}>
            <div className={styles.menu_programming__first_block}>
                <div className={styles.buttonsProgramming}>
                    <h1>
                        Виберіть мову програмування:
                    </h1>
                    <div className={styles.buttonsProgramming__oll}>
                        <Link href="/programming-card?lang=python" className={styles.link}><button className={styles.buttonsProgramming__btn}>Python</button></Link>
                        <Link href="/programming-card?lang=javaScript" className={styles.link}><button className={styles.buttonsProgramming__btn}>JavaScript</button></Link>
                        <Link href="/programming-card?lang=java" className={styles.link}><button className={styles.buttonsProgramming__btn}>Java</button></Link>
                        <Link href="/programming-card?lang=csharp" className={styles.link}><button className={styles.buttonsProgramming__btn}>C#</button></Link>
                        <Link href="/programming-card?lang=cplus" className={styles.link}><button className={styles.buttonsProgramming__btn}>C++</button></Link>
                        <Link href="/programming-card?lang=c" className={styles.link}><button className={styles.buttonsProgramming__btn}>C</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Programmers;