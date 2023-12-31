export const msToHMS = (ms: number) => {
    // Converts a number in ms to [h:m:s] in numbers
    let remainingSeconds = ms / 1000;
    const hours = Math.floor(remainingSeconds / 60 / 60);
    remainingSeconds -= hours * 60 * 60;
    const minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds -= minutes * 60;
    return [hours, minutes, remainingSeconds];
}

export const HMStoMS = (HMS: Array<number>) => {
    let ms = HMS[0] * 60 * 60 * 1000;
    ms += HMS[1] * 60 * 1000;
    ms += HMS[2] * 1000;
    return ms;
}

export const timeToString = (time: Array<number>) => {
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