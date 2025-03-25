"use client"
import Image from 'next/image'
import styles from './panel-tools.module.css';
import left from './../../../public/left.png'
import right from './../../../public/right.png'
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Timer from '../timer/page';
import Keyboard from '../keyboard/page';
import ModalWarning from '../modal-warning/page';

const PanelTools = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PanelToolsContent />
      </Suspense>
    );
  };

const PanelToolsContent = () => {

    const text = {
        en: "stroke side content meta head body scale width right label index leg brain script many dear lion pen cat home black tree class height pull key load wall jam model salt quick last note zebra element yogurt font joke frog xerox user batman vendetta most little bottle list",
        ru: "йод принт юрта цемент олово мост щеголь боров чаша рысь фортуна ель шелест жолудь ирис явор эскимо валун гроздь зола узвар трамвай объем хворост феликс крепость импорт ворона мыс ладья воск зонт эра йогурт чан нерест колье филин съезд тетрадь арфа протест след право лодка",
        uk: "їжак простор слива лілія трійчастий кропива стовбур фартух ескімо молодий єнот яблуня щавель крихкий домівка цистерна зозуля дощ їдкий стрічка єдність йогурт причина береза дружність цемент квітка горобина покоївка крижаний жвавий тонкий діло сіно простор управа щедрість ",
        jsDateText: `const date = new Date(); date.getDay(); date.getUTCDay(); date.setDate(); date.getUTCDate(); date.setUTCFullYear(); date.getDate(); date.getMonth(); date.setMonth(); date.getUTCMonth(); date.setUTCMonth(); date.getFullYear(); date.setFullYear(); date.getUTCFullYear(); date.setUTCFullYear(); date.getHours(); date.setHours(); date.getUTCHours(); date.setUTCHours(); date.getMinutes(); date.setMinutes(); date.getUTCMinutes(); date.setUTCMinutes(); date.getSeconds(); date.setSeconds(); date.getUTCSeconds(); date.setUTCSeconds(); date.getMilliseconds(); date.setMilliseconds(); date.getUTCMilliseconds(); date.setUTCMilliseconds();`,
        jsArrText: `array.of() array.from() array.push() array.shift() array.unshift() array.splice() array.find() array.findIndex() array.filter() array.some() array.every() array.forEach() array.sort() array.reverse() array.concat() array.map(() => { }); array.join() array.includes() array.indexOf() array.reduce() array.reduceRight() array.length`,
        jsObjText: `object.assign() object.create() object.defineProperties() object.defineProperty() Object.entries() object.freeze() Object.fromEntries() object.hasOwn() object.is() Object.isFrozen() object.keys() object.seal() object.isSealed() object.values() object.setPrototypeOf() object.groupBy() object.getOwnPropertyNames()`,
        jsMathText: `Math.abs() Math.acos() Math.acosh() Math.asin() Math.asinh() Math.atan() Math.atan2() Math.trunc() Math.tanh() Math.tan() Math.sqrt() Math.sinh() Math.sin() Math.sign() Math.round() Math.random() Math.pow() Math.min() Math.max() Math.exp() Math.cosh() Math.clz32() Math.cbrt() Math.atanh()`,
        jsSetText: `const a = new Set([1, 2, 3]); a.add() a.clear() a.delete() a.difference() a.entries() a.forEach() a.has() a.intersection() a.isDisjointFrom() a.isSubsetOf() a.isSupersetOf() a.keys() a.symmetricDifference() a.union() a.values() a.size`,
        jsNumText: `const a = 5; a.isFinite() a.isInteger() a.isNaN() a.isSafeInteger() a.parseFloat() a.parseInt() Number.prototype.toExponential() Number.prototype.toFixed() Number.prototype.toLocaleString() Number.prototype.toPrecision() Number.prototype.valueOf() Number.prototype.toString()`,
    }
    const [started, setStarted] = useState(true);
    let [textLeft, setTextLeft] = useState('Натисніть');
    let [textRight, setTextRight] = useState('Пробіл');
    const [startTimer, setStartTimer] = useState(false);
    const [nullTimer, setNullTimer] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const searchParams = useSearchParams();
    const maxTextLength = 16;
    const lang = searchParams.get('lang');

    useEffect(() => {

        const firstChar = textRight.charAt(0);

        const handleKeyDown = (event) => {
            const pressedKey = event.key;
            if (event.key === ' ' && started) {
                setStartTimer(true);
                setTextLeft('');
                setTextRight(text[lang]);
                setStarted(false);
            } else if (pressedKey == firstChar) {
                setTextLeft(prevTextLeft => {
                    const newTextLeft = prevTextLeft + pressedKey;
                    if (newTextLeft.length > maxTextLength) {
                        return newTextLeft.slice(1);
                    }
                    return newTextLeft;
                });
                setTextRight(prevTextRight => prevTextRight.slice(1));
            } else if (textRight.length === 0) {
                setTextLeft('Натисніть');
                setTextRight('Пробіл');
                setStartTimer(false);
                setStarted(true);
                setNullTimer(true);
                setDialogVisible(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [searchParams, textRight]);

    return (
        <div className={styles.key_bourd}>
            <ModalWarning />
            {dialogVisible && <ModalWarning />}
            <h1 className={styles.key_bourd__head}></h1>
            <Timer startTimer={startTimer} nullTimer={nullTimer} />
            <div id={styles.stroke}>
                <div className={styles.left_side}>{textLeft}</div>
                <div className={styles.right_side}>{textRight}</div>
            </div>
            <div className={styles.instrument_panel}>
                <div className={styles.pointer_with_left_hand}>
                    <Image src={left} alt="left-hand" className={styles.right_hand} />
                    <span className={`${styles.pointer} ${styles.pointer_l_hand}`}></span>
                </div>
                <Keyboard lang={lang} />
                <div className={styles.pointer_with_right_hand}>
                    <Image src={right} alt="right-hand" className={styles.right_hand} />
                    <span className={`${styles.pointer} ${styles.pointer_r_hand}`}></span>
                </div>
            </div>
        </div>
    )
}

export default PanelTools;