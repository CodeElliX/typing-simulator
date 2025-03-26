import { useMemo } from 'react';
import styles from './educational-lessons.module.css';
import { lessonsData } from '../utils/lessons-data';
import Link from 'next/link';

const EducationalLessons = (props) => {

    const rows = useMemo(() => {
        const result = [];
        let currentRow = { category: null, cards: [] };

        lessonsData[props.lang]?.forEach((lesson) => {
            const isNewCategory = lesson.category !== currentRow.category;

            if (isNewCategory || currentRow.cards.length === 6) {
                if (currentRow.cards.length > 0) {
                    result.push(currentRow);
                }
                currentRow = { category: lesson.category, cards: [] };
            }

            currentRow.cards.push(
                <div key={lesson.keys} className={`${styles.card} ${styles[`bg${currentRow.cards.length % 3}`]}`}>
                    <h3>{lesson.keys}</h3>
                    <Link href={`/panel-tools?lang=${props.lang}_less${lesson.lesson.match(/\d+/)?.[0] || 1}`}>
                        <p>{lesson.lesson}</p>
                    </Link>
                </div>
            );
        });

        if (currentRow.cards.length > 0) {
            result.push(currentRow);
        }

        return result;
    }, [props.lang]);

    return (
        <section className={styles.wrap}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.categoryRow}>
                    <h1 className={styles.categoryTitle}>{row.category}</h1>
                    <div className={styles.cardsContainer}>{row.cards}</div>
                </div>
            ))}
        </section>
    );
};

export default EducationalLessons;
