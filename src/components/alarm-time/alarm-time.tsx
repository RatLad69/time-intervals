import classNames from 'classnames';
import styles from './alarm-time.module.scss';
import { timeToString } from '../../timeCalcs';

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

    const handleXClick = () => {
        removeAlarm(alarmID);
    }

    return <div className={classNames(styles.root, className)}>
        <div className={styles['time-display']}>
            {timeToString(duration)}</div><button className={styles.RemoveTimeButton} onClick={handleXClick}>X</button>
    </div>;
};
