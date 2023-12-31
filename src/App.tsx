import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { AlarmTime } from './components/alarm-time/alarm-time';
import { NewInterval } from './components/new-interval/new-interval';
import { inToHMS, msToHMS, timeToString } from './timeCalcs';

let timeStarted = 0;
let intervalEnd = 0;

function App() {
    const [alarmIntervals, setAlarmIntervals] = useState<React.ReactElement[]>([]);
    const [alarmsAdded, setAlarmsAdded] = useState(0);
    const [counting, setCountingState] = useState(false);
    const [pauseText, setPauseText] = useState("Start");
    const [currentCount, setCurrentCount] = useState("0:00");
    //const [timeStarted, setTimeStarted] = useState(0);
    //const [intervalEnd, setIntervalEnd] = useState(0);

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
            timeStarted = 0;
        } else {
            setPauseText("Pause");
            timeStarted = Date.now();
            intervalEnd = timeStarted + 300 * 1000; //TODO: Change to duration of first alarm
            console.log(intervalEnd - timeStarted);
        }
        setCountingState(!counting);
    }

    const handleReset = () => {
        // TODO: This will reset the countdown to the initial state for the current interval
        console.log("Reset");
    }

    useEffect(() => {
        if (alarmIntervals.length === 0) {
            setCurrentCount("0:00");
        } else {
            setCurrentCount(timeToString(alarmIntervals[0].props.duration));
        }
    }, [alarmIntervals]);

    const timeUpdate = (isCounting: boolean) => {
        if (isCounting) {
            // Start and end time should already be set by handlePause
            const timeLeft = intervalEnd - Date.now();
            const timeLeftHMS = msToHMS(timeLeft);
            const timeLeftString = timeToString(timeLeftHMS);
            setCurrentCount(timeLeftString);
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