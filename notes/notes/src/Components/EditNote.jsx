import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditNote = () => {

    const [data, setData] = useState('')
    const { id } = useParams()
    const navigate=useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(`http://localhost:5000/viewone/${id}`)
            console.log(response.data);
            setData(response.data)
        }
        fetchData()
    },[id])

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            let response=await axios.put(`http://localhost:5000/update/${id}`,data)
            if (response.data) {
                alert("Note updated successfully")
                navigate('/')
            }
        } catch (error) {
            
        }
    }

    return (
        <>

            <section>
                <div className='main'>
                    <div className='box'>
                        <p className='name'>Edit Your Note</p>

                        <form action="" onSubmit={handleSubmit}>
                            <div className='form'>
                                <input type="text" name="title" id="" value={data.title} required onChange={handleChange} />
                                <textarea name="description" id="" value={data.description} required onChange={handleChange}></textarea>
                                <button>Add Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>


        </>
    )
}

export default EditNote