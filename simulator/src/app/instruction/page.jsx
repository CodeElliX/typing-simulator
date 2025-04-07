import styles from './instruction.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Instruction = () => {
    function solution(n){
        
      }
   console.log(solution(4.6))

    return (
        <>
            <main className={styles.wrap}>
                <main className={styles.main_instructions}>
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
                    </div>
                    <h2>Як розпочати?</h2>
                    <ul>
                        <li>Заходь до розділу "Навчання"</li>
                        <li>Обирай розкладку клавіатури - на вибір є три клавіатури: </li>
                        <ol>
                            <li>українською мовою</li>
                            <li>англійською </li>
                            <li>та російською(не бажано).</li>
                        </ol>

                        <li>І потім вже можна обрати уроки.</li>

                        Якщо ви тільки почали вивчати техніку сліпого друку - бажано розпочинати
                        з першого уроку.

                    </ul>
                    <h2>Положення пальців на клавіатурі</h2>

                    <ul>
                        <li> На віртуальній клавіатурі ти можешь побачити дві горизонтальні рисочки
                            під літерами <span className={styles.btn_inst}>А</span> та <span className={styles.btn_inst}>O</span> - на клавіатурі українською і російскою, та <span className={styles.btn_inst}>F</span> і <span className={styles.btn_inst}>J</span> -
                            на англійській розкладці.</li>
                        <li>Тепер подивись на свою реальну клавіатуру - ці рисочки є і у тебе.</li>
                        <li> Поклади обидва вказівних пальці на ці рисочки. Це своєрідні орієнтири, відносно яких
                            ти і будешь запам'ятовувати розташування інших клавіш.</li>
                        <li>Щоб тобі було легше розібратись якими пальцем натискати конкретні клавіші -
                            ми намалювали долоні.</li>
                        <li>Колір кожного пальця співпадає з кольором клавіші, яку
                            потрібно натискати.</li>
                        <li>Не намагайся тиснути не за планом, а як тобі зручно, адже згодом це може
                            стати причиною плутання букв.</li>
                        <li>Також рекомендуємо проходити уроки однією мовою розкладки клавіатури до повного
                            її опанування, щоб запобігти плутанини в подальшому</li>
                    </ul>
                    <h2>Розділ для програмістів</h2>
                    <div>
                        Якщо ти вже вмієшь друкувати і хочешь тільки відточити навички швидкісного друку
                        для підвищення ефективності написання коду - сміло обирай цей розділ.
                    </div>
                    <Image className={styles.main_instructions_keyboard} src="/keyBoard.png" height={150} width={300} alt="keyboard" />
                </main>
            </main>
        </>
    )
}

export default Instruction;