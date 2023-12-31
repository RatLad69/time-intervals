import classNames from 'classnames';
import styles from './new-interval.module.scss';
import { useState } from 'react';
import { inToHMS } from '../../timeCalcs'

export interface NewIntervalProps {
    className?: string;
    addNewAlarm: (...args: any[]) => any;
}

let duration = "0:00";
let HMSduration = [0, 0, 0, 0];

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const NewInterval = ({ className, addNewAlarm }: NewIntervalProps) => {

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        HMSduration = inToHMS(value);
        duration = String(HMSduration[0]) + ":" + String(HMSduration[1]) + ":" + String(HMSduration[2]);
    }

    const handleClick = () => {
        console.log("click");
        addNewAlarm(HMSduration);
    }

    return <div className={classNames(styles.root, className)}>
        <input type="text" className={styles['time-input']} onChange={handleChange} />
        <button onClick={handleClick}>Add</button></div>;
};