'use client'
import axios from 'axios'
import { useState } from 'react'

const CreateOwner = () => {

    const [ firstName, setFirstName ] = useState('Rudhamoy')
    const [ lastName, setLastName ] = useState('Debbarma')
    const [mobile, setMobile ] = useState('8787767132')
    const [pincode, setPincode ] = useState('799001')
    const [address, setAddress ] = useState('Abhaynagar, agartala')

    const formData = {
        firstName,
        lastName,
        mobile,
        pincode: parseInt(pincode),
        address
    }

    const submitHandler = () => {
        axios.post('/api/owner/create', formData)
    }

  return (
    <div style={{display: 'flex', flexDirection: "column", gap: '1rem', width: "30rem"}}>
        <input onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
        <input onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
        <input onChange={e => setMobile(e.target.value)} placeholder="Mobile" />
        <input onChange={e => setPincode(e.target.value)} placeholder="Pincode" />
        <input onChange={e => setAddress(e.target.value)} placeholder="Address" />
        <button onClick={submitHandler}>Create Owner</button>
    </div>
  )
}

export default CreateOwner