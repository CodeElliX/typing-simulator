import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer__wrap}>
            <address className={styles.content}>
                <p>Touch Typing Simulator © 2025</p>
                <p>Made with ❤ by <a href="mailto:codeellix@gmail.com">AneleW</a></p>
            </address>
        </div>
    )
}

export default Footer;