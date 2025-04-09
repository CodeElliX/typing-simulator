import Link from 'next/link';
import styles from './Header.module.css';
import React from 'react';


const Header: React.FC = () => {
  return (
    <header className={styles.head}>
      <ul className={styles.list_head}>
        <Link href="/instruction" className={styles.link}><li>Інструкція</li></Link>
        <Link href="/speed-test" className={styles.link}><li>Тест на швидкість печаті</li></Link>
        <Link href="/education" className={styles.link}><li>Навчання</li></Link>
        <Link href="/programmers" className={styles.link}><li>Програмістам</li></Link>
      </ul>
    </header>
  )
}

export default Header;