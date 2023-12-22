import classNames from 'classnames';
import styles from './new-interval.module.scss';

export interface NewIntervalProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const NewInterval = ({ className }: NewIntervalProps) => {
    return <div className={classNames(styles.root, className)}>
        <input type="time" className={styles['time-input']} />
        <button>Add</button></div>;
};
