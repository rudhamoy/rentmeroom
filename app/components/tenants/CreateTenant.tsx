'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import styles from './tenant.module.css'

const CreateTenant = () => {
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ mobile, setMobile ] = useState(0)

    const { data } = useSession()

    const updateHandler = async() => {
        const body = {
            email: data?.user?.email,
            firstName,
            lastName,
            mobile,
            role: 'tenant'
        }

       let res = await axios.put('/api/tenant', body)

       console.log(res)

    }

  return (
    <div className={styles.tenant__formContainer}>
        <input type="text" placeholder='First Name' onChange={e => setFirstName(e.target.value)} />
        <input type="text" placeholder='Last Name' onChange={e => setLastName(e.target.value)} />
        <input type="text" placeholder='Mobile Number' onChange={e => setMobile(e.target.value)} />
        <button onClick={updateHandler}>Save</button>
    </div>
  )
}

export default CreateTenant