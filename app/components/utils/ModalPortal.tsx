import styles from './utils.module.css'

const ModalPortal = ({
    children
  }: {
    children: React.ReactNode
  }) => {
  return (
    <div className={styles.modalPortal__Container}>
        {children}
    </div>
  )
}

export default ModalPortal