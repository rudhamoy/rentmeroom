'use client'
import Image from 'next/image'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import backgroundImage from '@/assets/svg/authBG.png'
import styles from '../auth.module.css'
import { signIn } from 'next-auth/react'

const SignupPage = () => {
  return (
    <div className={styles.container}>
      {/* left section - info */}
      <section>
        <div>
          <h1 style={{textAlign: "center", fontSize: "50px"}}>RENTMEROOM</h1>
          <Image src={backgroundImage} width={500} height={250} alt="rentmeroom" />
        </div>
      </section>
      {/* right section - form */}
      <section>
      
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
      </section>
    </div>
  )
}

export default SignupPage


