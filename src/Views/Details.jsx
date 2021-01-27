import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Details(props) {
    const history = useHistory()
    const query = useQuery()

    const [activity, setActivity] = useState({
        room: "",
        group: "",
        lecture: "",
        slot: "",
        teacher: ""
    })

    useEffect(() => {
        fetch(`/api/activities?slot=${query.get('slot')}&group=${query.get('group')}`)
        .then(res => res.json())
        .then(body => {
            setActivity(body[0])
        })
    }, [])

    const handleDelete = ((event) => {
        axios.delete(`/api/activities`, {
            data: {
                ...activity
            }
        })
        .then(
            history.push('/groupplan')
        )
    })

    const handleUpdateRedirect = (s, g) => {
        history.push(`/update?slot=${s}&group=${g}`)
    }

    return (
        <>
        <h3>Details</h3>

<div className="table-responsive">
    <table className="table table-bordered">
      <thead>
          <tr className="text-bold">
            <th>
                Room
            </th>
            <th>
                Group
            </th>
            <th>
                Lecture
            </th>
            <th>
                Teacher
            </th>
           </tr>
      </thead>
      <tbody>
        <tr>  
            <td>
                {activity.room}
            </td>
            <td>
                {activity.group}
            </td>
            <td>
                {activity.lecture}
            </td>
            <td>
                {activity.teacher}
            </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div>
    <button type="button" className="btn btn-outline-info btn-block col-sm-4" onClick={() => handleUpdateRedirect(activity.slot, activity.group)}>Update</button>
    <button type="button" className="btn btn-outline-danger btn-block col-sm-4" onClick={handleDelete}>Delete</button>
</div>
        </>
    )
}

export default Details