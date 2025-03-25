import styles from './educational-lessons.module.css';
import {lessonsData} from '../utils/lessons-data'

const EducationalLessons = (props) => {
    return (
        <div>
            <section className={styles.section}>
                {lessonsData[props.lang]?.map((lesson, index) => (
                    <div key={index}>
                        <h1>{lesson.category}</h1>
                        <span className={styles.language_selection__card}>
                            <h3>{lesson.keys}</h3>
                            <p>{lesson.lesson}</p>
                        </span>
                    </div>
                ))}
            </section>
        </div>)
}

export default EducationalLessons;