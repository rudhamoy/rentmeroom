
import styles from './home.module.css'

const HeroSection = () => {
  return (
    <div className={styles.hero__container} >
      <div style={{zIndex: 990}} >
        <div className={styles.hero__searchForm}>
          <input placeholder='Street, place, pincode' />
          <div>
            <input placeholder='House type' />
            <input placeholder='Price range' />
          </div>
          <button>Search</button>
        </div>
      </div>
      <div className={styles.hero__colorBg}></div>
    </div>
  )
}

export default HeroSection