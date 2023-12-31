import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { AlarmTime } from './components/alarm-time/alarm-time';
import { NewInterval } from './components/new-interval/new-interval';
import { inToHMS, msToHMS, timeToString } from './timeCalcs';

let timeStarted = 0;
let intervalEnd = 0;
//let leftInInterval = 0;

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
        if (alarmIntervals.length > 0) {
            if (counting) {
                setPauseText("Resume");
                timeStarted = 0;
            } else {
                setPauseText("Pause");
                timeStarted = Date.now();
                intervalEnd = timeStarted + inToHMS(currentCount)[3] * 1000;
                console.log(intervalEnd - timeStarted);
            }
            setCountingState(!counting);
        }
    }

    const handleReset = () => {
        // TODO: This will reset the countdown to the initial state for the current interval
        console.log("Reset");
    }

    useEffect(() => {
        if (!counting) {
            if (alarmIntervals.length === 0) {
                setCurrentCount("0:00");
            } else if (alarmIntervals.length === 1) { //Change to just else?
                setCurrentCount(timeToString(alarmIntervals[0].props.duration));
            }
        } else {
            if (alarmIntervals.length === 0) {
                setPauseText("Start");
                setCountingState(false);
            } else {
                setCurrentCount(timeToString(alarmIntervals[0].props.duration));
                console.log(alarmIntervals[0].props.duration);
                console.log("Current count set to: " + currentCount);
                timeStarted = Date.now();
                intervalEnd = timeStarted + alarmIntervals[0].props.duration[3] * 1000;
            }
        }
    }, [alarmIntervals]);

    useEffect(() => {
        if (inToHMS(currentCount)[3] < 1 && counting) {
            // Detects if the current count has reached 0. If it has, deletes that alarm.
            removeAlarm(alarmIntervals[0].props.alarmID);
        }
    }, [currentCount])

    const timeUpdate = (isCounting: boolean) => {
        // Called at specified interval from setInterval
        // Adjusts the count based on time when called
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