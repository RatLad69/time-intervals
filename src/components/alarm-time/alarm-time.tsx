import classNames from 'classnames';
import styles from './alarm-time.module.scss';

export interface AlarmTimeProps {
    className?: string;
    duration: Array<number>;
    alarmID: number;
    removeAlarm: (...args: any[]) => any;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const AlarmTime = ({ className, duration, alarmID, removeAlarm }: AlarmTimeProps) => {
    const timeToString = (time: Array<number>) => {
        let timeString = "";
        for (let i = 0; i < time.length - 1; i++) {
            if (String(time[i]).length === 1) {
                timeString += "0";
            }
            timeString += time[i];
            if (i != time.length - 2) {
                timeString += ":";
            }
        }
        return timeString;
    }

    const handleXClick = () => {
        removeAlarm(alarmID);
    }

    return <div className={classNames(styles.root, className)}>
        <div className={styles['time-display']}>
            {timeToString(duration)}</div><button className={styles.RemoveTimeButton} onClick={handleXClick}>X</button>
    </div>;
};
