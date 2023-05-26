import Image from 'next/image';
import { MdFacebook } from 'react-icons/md'
import { BsInstagram, BsTwitter } from 'react-icons/bs'
import { FaLinkedin } from 'react-icons/fa'

import styles from './navigation.module.css'
import bgOne from '@/assets/svg/city.png'
import bgTwo from '@/assets/svg/city2.png'

const Footer = () => {
  return (
    <div className={styles.footer__container}>

      {/* quick links */}
      <div className={styles.footer__quickLinks}>
        <ul>
          <li>About</li>
          <li>Help</li>
          <li>Advertise</li>
          <li>Guide</li>
          <li>Terms fo Use</li>
          <li>Privacy Policy</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>

      <section className={styles.footer__para}>
        <p>Rentmeroom is committed to ensuring digital experience for everyone. We are continuously working to improve the accessibility of our web experience for everyone, and we welcome feedback and accommodation requests. If you wish to report an issue or seek an accommodation, please let us know.</p>
      </section>

      <div className={styles.footer__socialLinkContainer}>
        <p>RENTMEROOM</p>
        <div className={styles.footer__socialLinks}>
          <p>Follow us:</p>
          <ul>
            <li>
              <MdFacebook style={{fontSize: '2rem', cursor: 'pointer'}} />
            </li>
            <li>
              <BsInstagram style={{fontSize: '2rem', cursor: 'pointer'}} />
            </li>
            <li>
              <FaLinkedin style={{fontSize: '2rem', cursor: 'pointer'}} />
            </li>
            <li>
              <BsTwitter style={{fontSize: '2rem', cursor: 'pointer'}} />
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footer__backgroundImg}>
        <Image alt="bg" src={bgOne} width={550} height={250} />
        <Image alt="bg" src={bgTwo} width={550} height={250} />
      </div>
    </div>
  )
}

export default Footer