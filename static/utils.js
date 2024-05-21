const list_of_days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];


function from_time_string(time_string) {
    const [hour, minute] = time_string.split(':');
    let hour_int = parseInt(hour);
    if (hour_int > 12) {
        hour_int -= 12;
    }
    const minutes = hour_int * 60 + parseInt(minute);
    if (time_string.includes('PM')) {
        return minutes + 12 * 60;
    }
    return minutes;
}


function to_time_string(minutes) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    if (hour > 12) {
        return `${hour - 12}:${minute < 10 ? "0" : ""}${minute} PM`;
    }
    return `${hour}:${minute < 10 ? "0" : ""}${minute} AM`;
}