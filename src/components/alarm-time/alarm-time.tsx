import classNames from 'classnames';
import styles from './alarm-time.module.scss';

export interface AlarmTimeProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const AlarmTime = ({ className }: AlarmTimeProps) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles['time-display']}>
            AlarmTime</div><button className={styles.RemoveTimeButton}>X</button>
    </div>;
};
