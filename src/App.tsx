import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { AlarmTime } from './components/alarm-time/alarm-time';
import { NewInterval } from './components/new-interval/new-interval';
import { timeToString } from './timeCalcs';

function App() {
    const [alarmIntervals, setAlarmIntervals] = useState<React.ReactElement[]>([]);
    const [alarmsAdded, setAlarmsAdded] = useState(0);
    const [counting, setCountingState] = useState(false);
    const [pauseText, setPauseText] = useState("Start");
    const [currentCount, setCurrentCount] = useState("0:00");
    const [timeStarted, setTimeStarted] = useState(0);

    const removeAlarm = (id: number) => {
        setAlarmIntervals((old) =>
            old.filter((alarmInterval) => alarmInterval.props.alarmID !== id));
    }

    const addAlarm = (time: Array<number>) => {
        let newAlarms: React.ReactElement[] = alarmIntervals.slice();
        newAlarms.push(<AlarmTime duration={time} alarmID={alarmsAdded} removeAlarm={removeAlarm} />);
        setAlarmIntervals(newAlarms);
        console.log("added new alarm");
        console.log("alarms: " + alarmIntervals);
        setAlarmsAdded(alarmsAdded + 1);
    }

    const handlePause = () => {
        if (counting) {
            setPauseText("Resume");
            setTimeStarted(Date.now());
        } else {
            setPauseText("Pause");
            setTimeStarted(0);
        }
        setCountingState(!counting);
    }

    const handleReset = () => {
        // This will reset the countdown to the initial state for the current interval
        console.log("Reset");
    }

    useEffect(() => {
        if (alarmIntervals.length === 0) {
            setCurrentCount("0:00");
        } else {
            setCurrentCount(timeToString(alarmIntervals[0].props.duration));
        }
    }, [alarmIntervals]);

    let aa = 500;
    const timeUpdate = (isCounting: boolean) => {
        if (isCounting) {
            aa--;
            console.log(aa, isCounting);
        } 
    }

    useEffect(() => {
        const interval = setInterval(() => timeUpdate(counting), 500);
        return () => {clearInterval(interval);};
    }, [counting]);

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
                <h1>{currentCount}</h1>
                <div className={styles['alarm-controls']}>
                    <button onClick={() => handlePause()}>{pauseText}</button>
                    <button onClick={() => handleReset()}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default App;