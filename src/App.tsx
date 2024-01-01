import { useEffect, useMemo, useState } from 'react';
import styles from './App.module.scss';
import { AlarmTime } from './components/alarm-time/alarm-time';
import { NewInterval } from './components/new-interval/new-interval';
import { inToHMS, msToHMS, timeToString } from './timeCalcs';

let timeStarted = 0;
let intervalEnd = 0;

function App() {
    // useEffect dependencies: alarmIntervals, changedByUser, currentCount, counting

    const [alarmIntervals, setAlarmIntervals] = useState<React.ReactElement[]>([]);
    const [alarmsAdded, setAlarmsAdded] = useState(0);
    const [counting, setCountingState] = useState(false);
    const [pauseText, setPauseText] = useState("Start");
    const [currentCount, setCurrentCount] = useState("0:00");
    const [changedByUser, setChangedByUser] = useState(false);
    //const [timeStarted, setTimeStarted] = useState(0);
    //const [intervalEnd, setIntervalEnd] = useState(0);
    const alarmSound = useMemo( () => new Audio("/bell1.mp3"), [] );

    const removeAlarm = (id: number, userClick: boolean) => {
        setAlarmIntervals((old) =>
            old.filter((alarmInterval) => alarmInterval.props.alarmID !== id));
        if (userClick) {
            setChangedByUser(true);
        }
    }

    const addAlarm = (time: Array<number>) => {
        let newAlarms: React.ReactElement[] = alarmIntervals.slice();
        newAlarms.push(<AlarmTime duration={time} alarmID={alarmsAdded} removeAlarm={removeAlarm} />);
        setAlarmIntervals(newAlarms);
        console.log("added new alarm");
        console.log("alarms: " + alarmIntervals);
        setAlarmsAdded(alarmsAdded + 1);
        setChangedByUser(true);
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
        setCurrentCount(timeToString(alarmIntervals[0].props.duration));
        timeStarted = Date.now();
        intervalEnd = timeStarted + alarmIntervals[0].props.duration[3] * 1000;
        console.log("Reset");
    }

    useEffect(() => {
        if (changedByUser) {
            console.log("Changed by user");
            if (alarmIntervals.length === 0) {
                setCurrentCount("0:00");
                setCountingState(false);
            } else {
                setCurrentCount(timeToString(alarmIntervals[0].props.duration));
            }
        } else {
            console.log("Changed by countdown");
            if (alarmIntervals.length === 0) {
                setPauseText("Start");
                setCountingState(false);
            } else {
                setCurrentCount(timeToString(alarmIntervals[0].props.duration));
                timeStarted = Date.now();
                intervalEnd = timeStarted + alarmIntervals[0].props.duration[3] * 1000;
            }
        }
        setChangedByUser(false);
    }, [alarmIntervals]);

    useEffect(() => {
        //For debugging
        console.log("Changed by user: " + changedByUser);
    }, [changedByUser])

    useEffect(() => {
        if (inToHMS(currentCount)[3] < 1 && counting) {
            // Detects if the current count has reached 0. If it has, deletes that alarm and rings.
            removeAlarm(alarmIntervals[0].props.alarmID, false);
            if (alarmSound.currentTime > 0) {
                alarmSound.currentTime = 0;
            } else {
                alarmSound.play();
            }
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
            // End of interval behavior handled by useEffect with dependency currentCount
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