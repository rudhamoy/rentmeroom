
import { MdAdd } from 'react-icons/md'
import styles from './rooms.module.css'

const CreateRoom = () => {
    return (
        <div className={styles.createRoom__container}>
            <div>
                <p>Start listing your home with us</p>
                <button><MdAdd style={{ color: "white" }} /> Create Room</button>
            </div>
        </div>
    )
}

export default CreateRoom