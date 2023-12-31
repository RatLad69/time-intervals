export const msToHMS = (ms: number) => {
    // Converts a number in ms to [h,m,s,totalseconds] in numbers
    let remainingSeconds = ms / 1000;
    const hours = Math.floor(remainingSeconds / 60 / 60);
    remainingSeconds -= hours * 60 * 60;
    const minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds -= minutes * 60;
    return [hours, minutes, remainingSeconds, hours * 60 * 60 + minutes * 60 + remainingSeconds].map((x) => Math.floor(x));
}

export const HMStoMS = (HMS: Array<number>) => {
    // Takes [h,m,s,(total seconds optional)] and returns total time in ms
    let ms = HMS[0] * 60 * 60 * 1000;
    ms += HMS[1] * 60 * 1000;
    ms += HMS[2] * 1000;
    return ms;
}

export const inToHMS = (uInput: string) => {
    // Takes input h:m:s and returns [h,m,s,total in seconds]
    const hmsList = uInput.split(":");
    let [hours, minutes, seconds] = [0, 0, 0];
    if (hmsList.length === 1) {
        seconds = Number(hmsList[0]);
    } else if (hmsList.length === 2) {
        minutes = Number(hmsList[0]);
        seconds = Number(hmsList[1]);
    } else if (hmsList.length === 3) {
        hours = Number(hmsList[0]);
        minutes = Number(hmsList[1]);
        seconds = Number(hmsList[2]);
    }
    let totalSeconds = 60 * 60 * hours + 60 * minutes + seconds;
    if (seconds >= 60) {
        minutes += Math.floor(seconds/60);
        seconds -= 60 * Math.floor(seconds/60);
    }
    if (minutes >= 60) {
        hours += Math.floor(minutes/60);
        minutes -= 60 * Math.floor(minutes/60);
    }
    return [hours, minutes, seconds, totalSeconds];
}

export const timeToString = (time: Array<number>) => {
    // Takes [h,m,s,total] and returns string "hh:mm:ss"
    let timeString = "";
    for (let i = 0; i < time.length - 1; i++) {
        if (String(time[i]).length === 1) {
            timeString += "0";
        }
        timeString += time[i];
        if (i !== time.length - 2) {
            timeString += ":";
        }
    }
    return timeString;
}