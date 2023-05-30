'use client'
import { useState } from 'react'
import styles from './rooms.module.css'

interface ToggleButtonProps {
    placeholder: string;
    switchATitle: string;
    switchBTitle: string;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ placeholder, setter, switchATitle, switchBTitle }) => {
    const [toggle, setToggle] = useState(false)

    function switchToggle (toggleType: boolean) {
        setToggle(toggleType)
        setter(toggleType)
    }

    return (
        <div className={styles.toggleButton__container}>
            <p>{placeholder}</p>

            <div className={styles.toggleButton__btnContainer}>
                <button
                onClick={() => switchToggle(false)}
                style={{ 
                    backgroundColor: `${toggle ===  false ? "black" : "white"}`, 
                    color: `${toggle ===  false  ? "white" : "black"}`
                  }}
                >{switchATitle}</button>
                <button
                onClick={() => switchToggle(true)}
                style={{ 
                    backgroundColor: `${toggle ===  true ? "black" : "white"}`, 
                    color: `${toggle ===  true  ? "white" : "black"}`
                  }}
                >{switchBTitle}</button>
            </div>

        </div>
    )
}

export default ToggleButton