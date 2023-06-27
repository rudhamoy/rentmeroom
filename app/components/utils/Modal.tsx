import styles from './utils.module.css'

const Modal = ({children, bgColor}: {children: React.ReactNode, bgColor: string}) => {
  
  return (
    <div className={styles.modal__container} style={{backgroundColor: `${bgColor}`}}>
      <div className={styles.modal__body}>
        {children}
      </div>
    </div>
  )
}

export default Modal