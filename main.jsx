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




function Week ({week}) {
    return (
        <tr>
            {week.map((day) => <td>{day}</td>)}
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
        console.log(newly_computed_week);
        weeks.push(newly_computed_week);
    }

    console.table(weeks);
    return (
        <table>
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
                {weeks.map(week => <Week {...{week}}/>)}
                
            </tbody>
        </table>
    )
}






function Form({ time_now, handleClickForaddEvent }) {
    return (
        <form>
            <h3>time now: {time_now}</h3>
            <label for="task">task: </label>
            <select name="" id="" required>
                <option value="swimming">swimmgin</option>
                <option value="swimming">swimmgin</option>
                <option value="swimming">swimmgin</option>
                <option value="swimming">swimmgin</option>
            </select>

            <br />
            <label for="ending-time: ">Choose a time for your meeting:</label>
            <input type="time" id="meeting-time" name="meeting-time" min="09:00" max="18:00" required/>
            <button onClick={handleClickForaddEvent}>add event {time_now}</button>
        </form>
    )
}





function Event({ durraction, task, deleteEvent, swapEvent, index, start_time, end_time }) {
    const [editingTile, setEditingTile] = React.useState(false);

    return (
        <div className="event" style={{ height: `${durraction/2}px` }} draggable="true" onDragStart={(e) => e.dataTransfer.setData('index', index)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => swapEvent(index, Number(e.dataTransfer.getData('index')))}>

            <div className="title" onClick={() => setEditingTile(!editingTile)}>{editingTile ? <input type='text' placeholder={task} autofocus /> : task}</div>


            {/* <div>durraction: {durraction}</div> */}
            <div>{to_time_string(start_time)} - {to_time_string(end_time)}</div>
            <button className="delete" onClick={() => deleteEvent(index)}>x</button>
        </div>
    )
}

function App() {
    console.table(entire_schedule)
    const [dayShowing, setDayShowing] = React.useState("monday");

    function switchDay(day) {
        if (day in entire_schedule) {
            setDayShowing(day);
        }
    }

    function change_day_by(amount) {
        if (dayShowing in entire_schedule) {
            const next_days_index = (list_of_days.indexOf(dayShowing) + amount) % 7;
            const next_day_string = list_of_days[next_days_index];
            setDayShowing(next_day_string);
        }
    }
    
    return (
        <React.Fragment>
           <ErrorBoundary>
                <Calendar/>
            </ErrorBoundary>
            <button onClick={() => {change_day_by(-1)}}> previous day</button>
            <button onClick={() => {change_day_by(1)}}> next day</button>
            <div class="week">
                <Day day={dayShowing} switchDay={switchDay} key={dayShowing}/>
            </div>
        </React.Fragment>
    )            
}


function Day({day, switchDay}) {
    console.table(entire_schedule[day])
    const [schedule, setSchedule] = React.useState(
        entire_schedule[day]
    );

    time_now = day_start_time;
    console.log(schedule)

    function deleteEvent (index_of_event)  {
        const new_schedule = schedule.filter((_, index) => index !== index_of_event);
        setSchedule(new_schedule);

    }

    function swapEvent (index_of_event, index_of_swap) {
        const temp = entire_schedule[day][index_of_event];
        entire_schedule[day][index_of_event] = entire_schedule[day][index_of_swap];
        entire_schedule[day][index_of_swap] = temp;
        const this_days_schedule_clone = [...entire_schedule[day]];
        setSchedule(this_days_schedule_clone);
    }



    function handleClickForaddEvent(event) {
        event.preventDefault();
        const task_name = document.getElementById("task").value;
        const event_ending_time = document.getElementById("meeting-time").value;
        const durraction = from_time_string(event_ending_time) - time_now;
        const new_schedule = [...schedule, { durraction: durraction, task: task_name }]

        setSchedule(new_schedule);
    }
    

    return (
        <React.Fragment>
            <main>
                <h1>{day}</h1>
                <button onClick={() => switchDay(prompt("which day?: "))}>change day</button>
                <div class="tasks">
                    {schedule.map((event, index) => {
                        time_now += parseInt(event.durraction);
                    return <Event {...event} {...{ deleteEvent, swapEvent, index, start_time: time_now - parseInt(event.durraction), end_time: time_now, handleClickForaddEvent }} key={index} />
                    })}
                    </div>
                <Form {...{ time_now, handleClickForaddEvent }} />
            </main>
        </React.Fragment>


    )
}

const day_start_time = 0;
let time_now = 0;

let del, swapEvent;
let day_dragging_from;
let index_of_draging;

const entire_schedule = {
    "sunday": [
        { durraction: 60, task: "dokter" },
        { durraction: 180, task: "lunch" },
        { durraction: 120, task: "supper" },
    ],
    "monday": [
        { durraction: 60, task: "breakfast" },
        { durraction: 180, task: "lunch" },
        { durraction: 120, task: "supper" },
        { durraction: 60, task: "learn react" },
        { durraction: 60, task: "learn react" },
        { durraction: 60, task: "learn react" },
        { durraction: 60, task: "learn react" },
        { durraction: 60, task: "learn react" },
        { durraction: 60, task: "learn react" },
    ],
    "tuesday": [
        { durraction: 69, task: "breakfast" },
        { durraction: 180, task: "lunch" },
        { durraction: 120, task: "supper" },
        { durraction: 60, task: "learn react" },
    ],
    "wednesday": [
        { durraction: 60, task: "breakfast" },
        { durraction: 180, task: "lunch" },
        { durraction: 120, task: "supper" },
        { durraction: 60, task: "learn react" },
    ],
    "thursday": [
        { durraction: 60, task: "breakfast" },
        { durraction: 180, task: "lunch" },
        { durraction: 120, task: "supper" },
        { durraction: 60, task: "learn react" },
    ],
    "friday": [
        { durraction: 60, task: "breakfast" },
        { durraction: 180, task: "lunch" },
        { durraction: 120, task: "supper" },
        { durraction: 60, task: "learn react" },
    ],
    "saturday": [
        { durraction: 60, task: "breakfast" },
        { durraction: 180, task: "lunch" },
        { durraction: 120, task: "supper" },
        { durraction: 60, task: "learn react" },
    ],
}

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






ReactDOM.render(<App />, document.getElementById('root'));