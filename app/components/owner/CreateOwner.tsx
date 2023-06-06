'use client'
import axios from 'axios'
import { useState } from 'react'
import MapMarker from '../utils/maps/MapMarker'

const CreateOwner = () => {

    const [ firstName, setFirstName ] = useState('Rudhamoy')
    const [ lastName, setLastName ] = useState('Debbarma')
    const [mobile, setMobile ] = useState('8787767132')
    const [pincode, setPincode ] = useState('799001')
    const [address, setAddress ] = useState('Abhaynagar, agartala')
    const [newPlace, setNewPlace] = useState(null);

    const addressData = {
      pincode: parseInt(pincode),
      address,
      coordinates: newPlace
    }

    const submitHandler = async () => {
      const address = axios.post('/api/address', addressData).then(({data}) => {
        console.log(data)
          axios.post('/api/owner/create', {
            firstName,
            lastName,
            mobile,
            address: [data.address._id]
          })
        })
        
    }

    console.log(newPlace)

  return (
    <div style={{display: 'flex', flexDirection: "column", gap: '1rem', width: "30rem", margin: "5rem"}}>
        <input onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
        <input onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
        <input onChange={e => setMobile(e.target.value)} placeholder="Mobile" />
        <input onChange={e => setPincode(e.target.value)} placeholder="Pincode" />
        <input onChange={e => setAddress(e.target.value)} placeholder="Address" />
        <div style={{height: "400px"}}>
          <MapMarker newPlace={newPlace} setNewPlace={setNewPlace} />
        </div>
        <button onClick={submitHandler}>Create Owner</button>
    </div>
  )
}

export default CreateOwner