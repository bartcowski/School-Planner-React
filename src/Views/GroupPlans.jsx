import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'

function GroupPlans() {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    const lectureHours = ["8:00-8:45", "8:55-9:40", "9:50-11:35", "11:55-12:40", "12:50-13:35", "13:45-14:30", "14:40-15:25", "15:35-16:20", "16:30-17:15"]
    
    const [groups, setGroups] = useState({
        data: [],
        chosen: undefined
    })

    const [activities, setActivities] = useState({
        data: []
    })

    //get groups
    useEffect(() => {
        fetch('/api/groups')
        .then(res => res.json())
        .then(body => {
            setGroups({
                data: body,
                chosen: body[0]
            })
        })
    }, [])

    //reload activities when groups change
    useEffect(() => {
        if (groups.chosen) {
            fetch(`/api/activities?group=${groups.chosen}`)
            .then(res => res.json())
            .then(body => {
                setActivities({
                    data: body
                })
            })
        }
    }, [groups])

    const handleGroupChoice = event => {
        setGroups(groups => ({ ...groups, chosen: event.target.value}))
    } 

    const tableSlots = []
    for (let i = 0; i < lectureHours.length; i++) {
        for (let j = 1; j <= 5; j++) {
            let slot = (i * 5) + j

            let activity = activities.data.find(act => slot === parseInt(act.slot))

            if (activity) {
                tableSlots.push(
                    <NavLink exact to={`/details?slot=${slot}&group=${activity.group}`} style={{cursor: "hand"}}
                    className="d-table w-100 h-100 text-reset text-decoration-none text-center">
                        <span className="d-table-cell align-middle">
                            <span>{activity.lecture} {activity.room}</span>
                        </span>
                    </NavLink>
                )
            } else {
                tableSlots.push(
                    <NavLink exact to={`/create?slot=${slot}&group=${groups.chosen}`}
                    style={{cursor: "hand"}} className="d-table w-100 h-100">
                    </NavLink>
                )
            }
        }
    }

    return (
        <>
        <h3>Activities for selected group:</h3>
        <div className="form-group row">
        <div className="col-sm-2">
            <select id="filter" className="form-control" value={groups.chosen} onChange={handleGroupChoice}>
                    {groups.data.map(g =>
                        <option value={g} key={g}>{g}</option>
                    )}
            </select>
        </div>
        </div>

        <table className="table table-bordered table-sm" style={{tableLayout: "fixed"}}>
            <thead>
                <tr>
                    <th scope="col">Time</th>
                    {
                        weekDays.map((day, i) => 
                            <th scope="col" key={i}>{day}</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    lectureHours.map((hour, i) => 
                        <tr key={i}>
                            <th scope="row">{hour}</th>
                                {[1,2,3,4,5].map(col => 
                                    <td className="p-0 h-100" key={col}>
                                        {tableSlots[(i * 5) + col - 1]}
                                    </td>
                                )}
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )

}

export default GroupPlans