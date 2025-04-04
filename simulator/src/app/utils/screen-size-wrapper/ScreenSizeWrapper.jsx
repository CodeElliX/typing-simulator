"use client";
import { useEffect, useState } from "react";
import styles from './screen-size-wrapper.module.css';
import Image from "next/image";

export default function ScreenSizeWrapper({ children }) {

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsSmallScreen(window.innerWidth < 1025);
        };

        checkScreen();

        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    if (isSmallScreen) {
        return (
            <div className={styles.restricted_access} style={{ padding: 20, textAlign: "center" }}>
                <Image
                    src="/min_screen.gif"
                    alt="Typing cat"
                    className={styles.restricted_access__image}
                    width={200}
                    height={200}
                />
                <h2>Цей симулятор доступний лише на пристроях з шириною більше 1024 пікселів</h2>
                <p>Будь ласка, відкрийте сайт на комп'ютері або ноутбуці.</p>
            </div>
        );
    }

    return <>{children}</>;
}
