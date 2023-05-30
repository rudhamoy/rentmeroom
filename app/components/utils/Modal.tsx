import styles from './utils.module.css'


const Modal = ({children}: {children: React.ReactNode}) => {
  
  return (
    <div className={styles.modal__container}>
      <div className={styles.modal__body}>
        {children}
      </div>
    </div>
  )
}

export default Modal