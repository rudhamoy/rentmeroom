'use client'
import { useState, useEffect } from 'react'
import styles from './rooms.module.css'

interface ToggleButtonProps {
    placeholder: string;
    switchATitle: string;
    switchBTitle: string;
    value?: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ placeholder, setter, value, switchATitle, switchBTitle }) => {
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
                    backgroundColor: `${value ===  false ? "black" : "white"}`, 
                    color: `${value ===  false  ? "white" : "black"}`
                  }}
                >{switchATitle}</button>
                <button
                onClick={() => switchToggle(true)}
                style={{ 
                    backgroundColor: `${value ===  true ? "black" : "white"}`, 
                    color: `${value ===  true  ? "white" : "black"}`
                  }}
                >{switchBTitle}</button>
            </div>

        </div>
    )
}

export default ToggleButton