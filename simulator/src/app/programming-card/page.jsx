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

    useEffect(() => {
        const lang = searchParams.get('lang');
        if (lang && objCardsLengProgramming[lang]) {
            setCards(objCardsLengProgramming[lang]);
            setSelectedButton(lang);
        }
    }, [searchParams])


    return (
        <>
            <i className={styles.selectedLang}>Обрана мова: <strong>{selectedButton ? languageNames[selectedButton] : ''}</strong></i>
            <div className={styles.main_block_programming_cards}>
                {cards.map((el, index) => {
                    const cardColor = colors[index % colors.length];
                    return (
                        <div key={index} style={{ backgroundColor: cardColor }} className={styles.card}>
                            <Link href="/instruction"><button>{el}</button> </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default ProgrammingCards;