import ModalWarning from "./modal-warning/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home_wrap}>
      <ModalWarning />
    </div>
  );
}
