import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Update() {
    const history = useHistory()
    const query = useQuery()

    const [activity, setActivity] = useState({
        room: "",
        group: "",
        lecture: "",
        slot: "",
        teacher: ""
    })

    const [updatedActivity, setUpdatedActivity] = useState({
        room: "",
        group: "",
        lecture: "",
        slot: "",
        teacher: ""
    })

    const [validData, setValidData] = useState({
        rooms: [],
        groups: [],
        lectures: [],
        teachers: [] 
    })

    useEffect(() => {
        fetch(`/api/activities?slot=${query.get('slot')}&group=${query.get('group')}`)
        .then(res => res.json())
        .then(body => {
            setActivity(body[0])
            setUpdatedActivity(body[0])
        })

        fetch(`/api/activities/valid/${query.get('slot')}?group=${query.get('group')}`)
        .then(res => res.json())
        .then(body => {
            setValidData(body)
        })
    }, [])

    const handleUpdate = (event) => {
        axios.put(`/api/activities`, {
            outdated: activity,
            updated: updatedActivity
        })
        .then(
            history.push(`/details?slot=${activity.slot}&group=${updatedActivity.group}`)
        )
    }
    
    const updateActivityRoomCallback = event => {
        setUpdatedActivity(outdated => ({ ...outdated, room: event.target.value}))
    }
    const updateActivityGroupCallback = event => {
        setUpdatedActivity(outdated => ({ ...outdated, group: event.target.value}))
    }
    const updateActivityLectureCallback = event => {
        setUpdatedActivity(outdated => ({ ...outdated, lecture: event.target.value}))
    }
    const updateActivityTeacherCallback = event => {
        setUpdatedActivity(outdated => ({ ...outdated, teacher: event.target.value}))
    }

    return (
        <>

        <h3>Update</h3>
        <form id="form" onSubmit={handleUpdate}>

            <div className="form-group row">
                <label htmlFor="Room" className="col-sm-1 col-form-label">Room</label>
                <div className="col-sm-4">
                    <select id="room" className="form-control" value={updatedActivity.room}
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
                    <select id="group" className="form-control" value={updatedActivity.group}
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
                    <select id="lecture" className="form-control" value={updatedActivity.lecture}
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
                    <select id="teacher" className="form-control" value={updatedActivity.teacher}
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

export default Update