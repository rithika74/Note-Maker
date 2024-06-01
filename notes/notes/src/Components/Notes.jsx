import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Edit from './Edit'
import { Link } from 'react-router-dom'

const Notes = () => {

    const [data, setData] = useState({
        title: '',
        description: ''
    })
    const [submitted, setSubmitted] = useState('')
    const [notes, setNotes] = useState([])

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await axios.post('http://localhost:5000/addnote', data)
            console.log(response.data);
            setSubmitted(response.data)
            if (response.data) {
                alert("Notes added successfully")
            }
        } catch (error) {
            console.error("Error adding notes", error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:5000/view')
                console.log(response.data);
                setNotes(response.data)
            } catch (error) {
                console.error("Error fetching data", error)
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        console.log(id);
        try {
            let response = await axios.delete(`http://localhost:5000/delete/${id}`);
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.log('Error deleting notes');
        }
    };

    return (
        <>

            <section>
                <div className='main'>
                    <div className='box'>
                        <p className='name'>Note App</p>

                        <form action="" onSubmit={handleSubmit}>
                            <div className='form'>
                                <input type="text" name="title" id="" placeholder='Title' required onChange={handleChange} />
                                <textarea name="description" id="" placeholder='Description' required onChange={handleChange}></textarea>
                                <button>Add Note</button>
                            </div>
                        </form>

                        <div>
                            {notes.length > 0 ? (
                                notes.map(item => (
                                    <div className='table'>
                                        <table>
                                            <th>
                                                <td>{item.title}</td>
                                            </th>
                                            <tr>
                                                <td className='data'>
                                                    <p>{item.description}</p>
                                                    <div className='btn'>
                                                        <Link to={`/edit/${item._id}`}>
                                                            <button className='btn1'>Edit</button>
                                                        </Link>
                                                        <button className='btn2' onClick={() => handleDelete(item._id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                ))
                            ) :
                                (<h2>No notes found</h2>)
                            }
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default Notes