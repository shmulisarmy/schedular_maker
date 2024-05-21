function Form({ time_now, handleClickForaddEvent }) {
    return (
        <form>
            <h3>time now: {time_now}</h3>
            <label for="task">task: </label>
            <select id="task" required name="task">
                <option value="swimming">swimmgin</option>
                <option value="swimming">swimmgin</option>
                <option value="swimming">swimmgin</option>
                <option value="swimming">swimmgin</option>
            </select>

            <br />
            <label for="ending-time: ">Choose a time for your meeting:</label>
            <input type="time" id="meeting-time" name="meeting-time" min="09:00" max="18:00" required />
            <button onClick={handleClickForaddEvent}>add event {time_now}</button>
        </form>
    )
}





function Event({ durraction, task, deleteEvent, swapEvent, index, start_time, end_time }) {
    const [editingTile, setEditingTile] = React.useState(false);

    return (
        <div className="event" style={{ height: `${durraction / 2}px` }} draggable="true" onDragStart={(e) => e.dataTransfer.setData('index', index)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => swapEvent(index, Number(e.dataTransfer.getData('index')))}>

            <div className="title" onClick={() => setEditingTile(!editingTile)}>{editingTile ? <input type='text' placeholder={task} autofocus /> : task}</div>


            {/* <div>durraction: {durraction}</div> */}
            <div>{to_time_string(start_time)} - {to_time_string(end_time)}</div>
            <button className="delete" onClick={() => deleteEvent(index)}>x</button>
        </div>
    )
}

function App() {
    const [dayShowing, setDayShowing] = React.useState(21);
    //point of placeholder is to make rerender work when deleteEvent is called
    const [placeholder, rerender] = React.useState(false);
    

    function switchDay(day_number) {
        if (day_number in entire_schedule) {
            setDayShowing(day_number);
        }
    }

    function change_day_by(amount) {
        if (typeof amount != 'number') {
            throw new Error('amount must be a number');
        }
        const new_day = dayShowing + amount;
        switchDay(new_day);
    }

    return (
        
        <section>
            <div className="day-selector">
                <ErrorBoundary>
                    <go_to_day_function_context.Provider value={setDayShowing}>
                        <dayShowing_context.Provider value={dayShowing}>
                            <Calendar switchDay={switchDay} />
                        </dayShowing_context.Provider>
                    </go_to_day_function_context.Provider>
                </ErrorBoundary>
                <button onClick={() => { change_day_by(-1) }}> previous day</button>
                <button onClick={() => { change_day_by(1) }}> next day</button>
            </div>
            <Day day={dayShowing} switchDay={switchDay} key={dayShowing} rerender={rerender} placeholder={placeholder} />
        </section>
    )
}


function Day({ day, switchDay, rerender, placeholder }) {
    console.table(entire_schedule[day])
    const [schedule, setSchedule] = React.useState(
        entire_schedule[day]
    );

    time_now = day_start_time;

    function deleteEvent(index_of_event) {
        const current_day = entire_schedule[day];
        current_day.splice(index_of_event, 1);
        console.log(current_day);
        setSchedule([...current_day]);
        rerender(!placeholder);

    }

    function swapEvent(index_of_event, index_of_swap) {
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
        console.log(durraction, task_name);
        entire_schedule[day].push({ durraction: durraction, task: task_name });
        // const new_schedule = [...schedule, { durraction: durraction, task: task_name }]
        rerender(!placeholder);
        setSchedule([...entire_schedule[day]]);
    }


    return (
        <React.Fragment>
            <main>
                <h1>{day}</h1>
                <div className="tasks">
                    {schedule.map((event, index) => {
                        time_now += parseInt(event.durraction);
                        return <Event
                            {...event}
                            {...{ deleteEvent, swapEvent, index, start_time: time_now - parseInt(event.durraction), end_time: time_now, handleClickForaddEvent }}
                            key={time_now-parseInt(event.durraction)} />
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




const go_to_day_function_context = React.createContext();
const dayShowing_context = React.createContext();


ReactDOM.render(<App />, document.getElementById('root'));