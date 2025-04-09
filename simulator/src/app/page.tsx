import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home_wrap}>
      <div className={styles.container}>
        <h2>🖥️ Техніка сліпого друку</h2>
        <p>
          На цьому сайті ти навчишся друкувати <strong>всліпу</strong>. Для цьго не потрібні роки тренувань, а лиш
          послідовне та постійне виконання уроків.
        </p>
        <p>
          А коли ти вже навчишся <span className={styles.highlight}>не дивитися на клавіатуру</span>, ми допоможемо тобі
          підвищити швидкість друку.
        </p>
        <p className={styles.note}>
          Ми — не комерційний проєкт! Усі уроки <strong>безоплатні</strong>, і тут немає набридливої реклами. 🚀
        </p>
        <section>
          <button>Почати навчання</button>
          <button>Перевірити свій рівень</button>
        </section>
      </div>
    </div>
  );
}
