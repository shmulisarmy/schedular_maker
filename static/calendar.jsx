class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Error caught by ErrorBoundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}


function Calendar_selected_day({ day }) {
    const setDayShowing = React.useContext(go_to_day_function_context);
    const dayShowing = React.useContext(dayShowing_context);

    return (
        <td className={`selected-day ${(dayShowing == day ? "showing" : "")}`}
            onClick={() => setDayShowing(day)}>
            {day}
            <div className="days-events-info">
                {day} has {entire_schedule[day].length} events
            </div>
        </td>
    )
}

function Calendar_regular_day({ day }) {
    return (
        <td>
            {day}
        </td>
    )
}



function Calendar_week({ week }) {
    return (
        <tr>
            {week.map((day) =>
                day in entire_schedule ?
                    <Calendar_selected_day day={day} />
                    : <Calendar_regular_day day={day} />
            )}
        </tr>
    )

}

function Calendar() {
    const days = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    ]

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        const newly_computed_week = days.slice(i, i + 7);
        weeks.push(newly_computed_week);
    }

    console.table(weeks);
    return (
        <table id="calendar">
            <tbody>
                <tr>
                    <th>sun</th>
                    <th>mon</th>
                    <th>tues</th>
                    <th>wed</th>
                    <th>thur</th>
                    <th>fri</th>
                    <th>sat</th>
                </tr>
                {weeks.map(week => <Calendar_week {...{ week }} key={week[0]} />)}
            </tbody>
        </table>
    )
}