'use client'
import { useState } from 'react'
import axios from 'axios'

const CreateRoomPage = () => {
  const [title, setTitle] = useState('1bhk room')
  const [description, setDescription] = useState('room for family/students')
  const [pricePerMonth, setPricePerMonth] = useState('6000')
  const [roomCategory, setRoomCategory] = useState('1BHK')
  const [tenants, setTenants] = useState('All')

  const submitHandler = () => {
    const obj = {
      title,
      description,
      pricePerMonth: parseInt(pricePerMonth),
      roomCategory,
      tenants
    }
    axios.post('/api/rooms', obj).then(res => console.log(res))
  }

  return (
    <div>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPricePerMonth(e.target.value)} />
      <input placeholder="Room type" onChange={(e) => setRoomCategory(e.target.value)} />
      <input placeholder="Tenants" onChange={(e) => setTenants(e.target.value)} />
      <button onClick={submitHandler}>CREATE ROOM</button>
    </div>
  )
}

export default CreateRoomPage