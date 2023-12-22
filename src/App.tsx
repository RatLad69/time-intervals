import { useState } from 'react';
import styles from './App.module.scss';
import { AlarmTime } from './components/alarm-time/alarm-time';
import { NewInterval } from './components/new-interval/new-interval';


function App() {

    return (
        <div className={styles.App}>
            <div className={styles['time-container']}>
                <div className={styles.intervals}>
                    <AlarmTime />
                    <AlarmTime />
                </div>
                <div className={styles['new-interval']}>
                    <NewInterval />
                </div>
            </div>
            <div className={styles['alarm-container']} />
        </div>
    );
}

export default App;