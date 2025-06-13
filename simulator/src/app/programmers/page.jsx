"use client"
import styles from "./programmers.module.css";
import Link from "next/link";

const Programmers = () => {

    const headerText = "Виберіть мову програмування:";
    return (
        <div className={styles.menu_programming}>
            <div className={styles.menu_programming__first_block}>
                <div className={styles.buttonsProgramming}>
                    <h1>
                        {headerText.split("").map((char, i) => (
                            <span key={i} style={{ animationDelay: `${i * 0.03}s`}}>
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
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