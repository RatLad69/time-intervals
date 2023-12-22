import { useState } from 'react';
import styles from './App.module.scss';
import { AlarmTime } from './components/alarm-time/alarm-time';
import { NewInterval } from './components/new-interval/new-interval';


function App() {
    //let alarmIntervals: React.ReactElement[] = [];
    const [alarmIntervals, setAlarmIntervals] = useState<React.ReactElement[]>([]);

    const addAlarm = (time: Array<number>) => {
        //alarmIntervals.push(<AlarmTime duration={time}/>);
        let newAlarms: React.ReactElement[] = alarmIntervals.slice();
        newAlarms.push(<AlarmTime duration={time} />);
        setAlarmIntervals(newAlarms);
        console.log("added new alarm");
        console.log("alarms: " + alarmIntervals);
    }

    return (
        <div className={styles.App}>
            <div className={styles['time-container']}>
                <div className={styles.intervals}>
                    {alarmIntervals}
                </div>
                <div className={styles['new-interval']}>
                    <NewInterval addNewAlarm={addAlarm} />
                </div>
            </div>
            <div className={styles['alarm-container']}>
                <h1>5:00</h1>
                <div className={styles['alarm-controls']}>
                    <button>Pause</button>
                    <button>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default App;