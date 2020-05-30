const millisecondsPerDay = 8.64e7;

export const currentDayNumber = () => {
    const d = new Date(new Date().toDateString()); // remove the time!
    return Math.ceil((d.getTime()) / millisecondsPerDay);
}

export const dayNumberToDate = (dayNumber) => {
    return new Date(dayNumber * millisecondsPerDay);
}

export const monthName = (d) => {
    if (typeof(d) !== "object")
        d = dayNumberToDate(d);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[d.getMonth()];
}

export const dayOfWeekName = (d) => {
    if (typeof(d) !== "object")
        d = dayNumberToDate(d);
    // const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()];
}

export const dayOfMonth = (d) => {
    if (typeof(d) !== "object")
        d = dayNumberToDate(d);
    return d.getDate();
}

