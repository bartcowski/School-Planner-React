import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Create() {
    const history = useHistory()
    const query = useQuery()

    const [activity, setActivity] = useState({
        room: "",
        group: query.get('group'),
        lecture: "",
        slot: parseInt(query.get('slot')),
        teacher: ""
    })

    const [validData, setValidData] = useState({
        rooms: [],
        groups: [],
        lectures: [],
        teachers: [] 
    })

    useEffect(() => {
        fetch(`/api/activities/valid/${query.get('slot')}?group=${activity.group}`)
        .then(res => res.json())
        .then(body => {
            setValidData({
                rooms: ["", ...body.rooms],
                groups: [...body.groups],
                lectures: ["", ...body.lectures],
                teachers: ["", ...body.teachers] 
            })
        })
    }, [])

    const handleSubmit = (event) => {
        axios.post(`/api/activities`, {
            ...activity
        })
        .then(
            history.push(`/groupplan`)
        )
    }
    
    const updateActivityRoomCallback = event => {
        setActivity(outdated => ({ ...outdated, room: event.target.value}))
    }
    const updateActivityGroupCallback = event => {
        setActivity(outdated => ({ ...outdated, group: event.target.value}))
    }
    const updateActivityLectureCallback = event => {
        setActivity(outdated => ({ ...outdated, lecture: event.target.value}))
    }
    const updateActivityTeacherCallback = event => {
        setActivity(outdated => ({ ...outdated, teacher: event.target.value}))
    }

    return (
        <>

        <h3>Create</h3>
        <form id="form" onSubmit={handleSubmit}>

            <div className="form-group row">
                <label htmlFor="Room" className="col-sm-1 col-form-label">Room</label>
                <div className="col-sm-4">
                    <select id="room" className="form-control" value={activity.room}
                    onChange={updateActivityRoomCallback}>
                        {validData.rooms.map(i =>
                            <option value={i} key={i}>{i}</option>
                        )}
                    </select>
                </div>    
            </div>

            <div className="form-group row">
                <label htmlFor="Group" className="col-sm-1 col-form-label">Group</label>
                <div className="col-sm-4">
                    <select id="group" className="form-control" value={activity.group}
                    onChange={updateActivityGroupCallback}>
                        {validData.groups.map(i =>
                            <option value={i} key={i}>{i}</option>
                        )}
                    </select>
                </div>    
            </div>

            <div className="form-group row">
                <label htmlFor="Lecture" className="col-sm-1 col-form-label">Lecture</label>
                <div className="col-sm-4">
                    <select id="lecture" className="form-control" value={activity.lecture}
                    onChange={updateActivityLectureCallback}>
                        {validData.lectures.map(i =>
                            <option value={i} key={i}>{i}</option>
                        )}
                    </select>
                </div>    
            </div>

            <div className="form-group row">
                <label htmlFor="Teacher" className="col-sm-1 col-form-label">Teacher</label>
                <div className="col-sm-4">
                    <select id="teacher" className="form-control" value={activity.teacher}
                    onChange={updateActivityTeacherCallback}>
                        {validData.teachers.map(i =>
                            <option value={i} key={i}>{i}</option>
                        )}
                    </select>
                </div>    
            </div>

        </form>

        <button type="submit" className="btn btn-outline-info btn-block col-sm-2" form="form">Submit</button>

        </>
    )
}

export default Create