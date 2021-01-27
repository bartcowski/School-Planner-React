import axios from 'axios'
import React, {useState, useEffect, useCallback} from 'react'

function Teachers() {
    const [teachers, setTeachers] = useState({
        data: []
    })

    const [newTeacher, setNewTeacher] = useState({
        surname: ""
    })

    const fetchTeachers = useCallback(() => {
        fetch('/api/teachers')
        .then(res => res.json())
        .then(body => {
            setTeachers({
                data: body
            })
        })
    }, [])

    useEffect(() => {
        fetchTeachers()
    }, [fetchTeachers])

    const handleNewTeacherChange = event => {
        setNewTeacher({
            surname: event.target.value
        })
    }

    const handleAddTeacher = event => {
        axios.post('/api/teachers', {
            surname: newTeacher.surname
        }).then(res => {
            setNewTeacher({
                surname: ""
            })
            fetchTeachers()
        })
        event.preventDefault()
    }

    const handleDeleteTeacher = t => {
        axios.delete('/api/teachers/' + t).then(res => {
            setNewTeacher({
                surname: ""
        })
        fetchTeachers()
        })
    }

    return (
    <>
        <h3>Available Teachers</h3>
        <div className="table-responsive">
        <table className="table table-bordered">
        <thead>
            <tr>
                {teachers.data.map(t =>
                        <th>
                        {t}
                        </th>
                    )                    
                }
            </tr>
        </thead>
        <tbody>
            <tr>
                {teachers.data.map(t =>
                        <td>
                        <form id="delete" method="post">
                        <button type="button" name="id" className="btn btn-outline-danger btn-sm col-sm-4" onClick={() => handleDeleteTeacher(t)}>Delete</button>
                        </form>
                        </td>
                    )
                }
            </tr>
        </tbody>
        </table>
        </div>

        <br/>
        <h4>Add new teacher</h4>
        <form className="mb-2" onSubmit={handleAddTeacher}>
            <div className="form-group">
            <div className="col-sm-4">
                <label htmlFor="Surname">Surname: </label>
                <input type="text" className="form-control" id="teachersurname" placeholder="Enter teacher's surname" name="Surname" 
                    value={newTeacher.surname} onChange={handleNewTeacherChange} required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
    )
}

export default Teachers