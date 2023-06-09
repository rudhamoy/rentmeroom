
'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image'
import styles from './home.module.css'
import bgImage from '../../assets/palaces.png'

const HeroSection = () => {
  const router = useRouter()
  return (
    <div className={styles.hero__container} >
      <div className={styles.hero__colorBg}>
      </div>
      <div className={styles.hero__textInfo}>
        <h1>Smart and easy way<br /> to find your next rent house</h1>
        <div>
          <Link 
          href="/rooms/list"
          className={styles.hero__link}
          >List your property</Link>
          {/* <button onClick={() => router.push('/rooms/list')}>List your property</button> */}
          <Link href="/" className={styles.hero__link}>Find rent house</Link>
        </div>
      </div>

    </div>
  )
}

export default HeroSection