
import Image from 'next/image'
import backgroundImage from '@/assets/svg/authBG.png'
// import styles from

const SignupPage = () => {
  return (
    <div className="container">
      {/* left section - info */}
      <section>
        <div className="section__container">
          <h1>RENTMEROOM</h1>
          <Image src={backgroundImage} width={500} height={250} alt="rentmeroom" />
        </div>
      </section>
      {/* right section - form */}
      <section></section>
    </div>
  )
}

export default SignupPage