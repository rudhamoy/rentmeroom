
'use client'
import { useRouter } from 'next/navigation';
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
          <button onClick={() => router.push('/rooms/list')}>List your property</button>
          <button>Find rent house</button>
        </div>
      </div>

    </div>
  )
}

export default HeroSection