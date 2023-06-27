'use client'
import Image from 'next/image'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import backgroundImage from '@/assets/svg/authBG.png'
import styles from '../auth.module.css'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ModalPortal from '@/components/utils/ModalPortal'
import Modal from '@/components/utils/Modal'
import { BsArrowLeft } from 'react-icons/bs'

const SignupPage = () => {

  const router = useRouter()

  return (
    <Modal bgColor='white'>
      <div className={styles.container}>
        {/* right section - form */}
        <section>
          <div>
            <h1 style={{ textAlign: "center", fontSize: "50px" }}>RENTMEROOM</h1>
          </div>
          <div className={styles.formContainer}>
            <input placeholder='Mobile' />
            <input placeholder='Password' />
            <input placeholder='Confirm Password' />
            <button>Sign Up</button>
          </div>

          <div className={styles.extraButton}>
            <button onClick={() => signIn('google')}>
              <FaGoogle />
              <span>Sign up with Google</span>
            </button>
            <button>
              <FaFacebookF />
              <span>Sign up with Facebook</span>
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

  )
}

export default SignupPage


