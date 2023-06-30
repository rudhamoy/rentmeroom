'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ModalPortal from '@/components/utils/ModalPortal'
import styles from '../auth.module.css'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import { signIn, useSession } from 'next-auth/react'
import { BsArrowLeft } from 'react-icons/bs'
import Modal from '@/components/utils/Modal'
import axios from 'axios'

const SigninPage = () => {
  const [currentUser, setCurrentUser] = useState({})
  const { data } = useSession()
  const router = useRouter()

  async function getCurrentUser() {
    const user = await axios.get('/api/users')
    setCurrentUser(user.data)
  }

  useEffect(() => {
    if (data !== null) {
      getCurrentUser()
    }
  }, [])

  useEffect(() => {
    if (Object.keys(currentUser).length !== 0 && !currentUser.hasOwnProperty('role')) {
      console.log('Role do not exists');
      router.push('/auth/complete-profile')
    } else if (Object.keys(currentUser).length !== 0 && currentUser.hasOwnProperty('role')) {
      console.log('Role does exists');
      router.push('/')
    } else {
      console.log('User not logged in + role not exist')
    }
  }, [currentUser, data, router])

  return (
    <>
      <Modal bgColor='white'>
        <div className={styles.signIn__container}>

          <section>
            <div>
              <h1 style={{ textAlign: "center", fontSize: "50px" }}>RENTMEROOM</h1>
            </div>
            <div className={styles.formContainer}>
              <input placeholder='Mobile' />
              <input placeholder='Password' />
              <button>Sign In</button>
            </div>

            <div className={styles.extraButton}>
              <button onClick={() => signIn('google')}>
                <FaGoogle />
                <span>Sign in with Google</span>
              </button>
              <button>
                <FaFacebookF />
                <span>Sign in with Facebook</span>
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
              <p style={{ cursor: "pointer" }}>
                <span><BsArrowLeft /></span>
                <span onClick={() => router.back()}>Go back</span>
              </p>
              <span onClick={() => router.push('/')} style={{ cursor: "pointer" }}>Cancel</span>
            </div>
          </section>

        </div>
      </Modal>
    </>
  )
}

export default SigninPage