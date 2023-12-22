import classNames from 'classnames';
import styles from './new-interval.module.scss';
import { useState } from 'react';

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

    const inToHMS = (uInput: string) => {
        const hmsList = uInput.split(":");
        let [hours, minutes, seconds] = [0, 0, 0];
        if (hmsList.length === 1) {
            seconds = Number(hmsList[0]);
        } else if (hmsList.length === 2) {
            minutes = Number(hmsList[0]);
            seconds = Number(hmsList[1]);
        } else if (hmsList.length === 3) {
            hours = Number(hmsList[0]);
            minutes = Number(hmsList[1]);
            seconds = Number(hmsList[2]);
        }
        let totalSeconds = 60 * 60 * hours + 60 * minutes + seconds;
        if (seconds >= 60) {
            minutes += Math.floor(seconds/60);
            seconds -= 60 * Math.floor(seconds/60);
        }
        if (minutes >= 60) {
            hours += Math.floor(minutes/60);
            minutes -= 60 * Math.floor(minutes/60);
        }
        return [hours, minutes, seconds, totalSeconds];
    }

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