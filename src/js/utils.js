
// Convertion min to hrs/min
export function timeConvertion(time) {

    if (time > 59) {
        let abbreviation = 'hrs';

        const hour = (time / 60).toFixed(0);
            if (hour == 1) abbreviation = 'hr';

        const min = ((hour % 1) * 100).toFixed(0);
            if (min == 0) time = `${hour}${abbreviation}`;
            else time = `${hour}${abbreviation} ${min}min`;
    }
    else {
        if (time == 60) time = '1 hr';
        else time = `${time}min`;
    }

    return time;

}

// Change first letter to upperCase
export function upperCase(string) {

    const firstLetter = string.charAt(0).toUpperCase();
    const text = string.slice(1);
    const newString = firstLetter + text;

    return newString;

}