"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import styles from "./programming-card.module.css";
import Link from "next/link";

const ProgrammingCards = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProgrammingCardsContent />
        </Suspense>
    );
}

const ProgrammingCardsContent = () => {
    let objCardsLengProgramming = {
        java: ["Set()", "Array methods", "Number", "Math", "DATE", "Objects"],
        javaScript: ["Set()", "Array methods", "Number", "Math", "DATE", "Objects"],
        python: ["Set()", "Array methods", "Number", "Math", "DATE", "Objects"],
        csharp: ["HashSet", "Arrays", "Number", "Math", "DATE", "Objects"],
        cplus: ["String", "Vector", "Set", "Map", "Class", "Queue"],
        c: ["Functions", "Math Functions", "Time Functions", "File IO", "Dynamic Memory", "String Functions"],
    };
    const colors = ['#F9E0FF', '#CBCEFF', '#F9CED1', '#D9DBFF', '#F9E8D1', '#CBFCE0'];
    const [cards, setCards] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);
    const searchParams = useSearchParams();

    const languageNames = {
        java: 'Java',
        javaScript: 'JavaScript',
        python: 'Python',
        csharp: 'C#',
        cplus: 'C++',
        c: 'C'
    };

    const cardId = searchParams.get("lang");

    useEffect(() => {
        if (selectedButton) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
        }
    }, [selectedButton])

    useEffect(() => {
        const lang = searchParams.get('lang');
        if (lang && objCardsLengProgramming[lang]) {
            setCards(objCardsLengProgramming[lang]);
            setSelectedButton(lang);
            window.scrollTo({ bottom: 0, behavior: "smooth" })
        }
    }, [searchParams])

    return (
        <>
            <i className={styles.selectedLang}>Обрана мова: <strong>{selectedButton ? languageNames[selectedButton] : ''}</strong></i>
            <div className={styles.main_block_programming_cards}>
                {cards.map((el, index) => {
                    const cardColor = colors[index % colors.length];
                    const langPrefix = selectedButton.toLowerCase().startsWith("python") ? "py" :
                        selectedButton.toLowerCase().startsWith("javascript") ? "js" :
                            selectedButton.toLowerCase().startsWith("java") ? "java" :
                                selectedButton;
                    const textKey = langPrefix === "ru" || langPrefix === "uk"
                        ? `${langPrefix}_${el.replace(/\s+/g, '')}`
                        : `${langPrefix}_${el.replace(/\s+/g, '').toLowerCase()}`;
                    return (
                        <div key={index} style={{ backgroundColor: cardColor }} className={styles.card}>
                            <Link href={`/panel-tools?lang=${textKey}`}><button>{el}</button> </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default ProgrammingCards;





