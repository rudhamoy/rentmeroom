import React from 'react'
import styles from './filter.module.css'
import { BsFilter } from 'react-icons/bs'

const More = () => {
  return (
    <div className={styles.filter__sort}>
        <span>More</span> <BsFilter />
        <div className={styles.filter__sortContainer}>
          <p>filter by sorting</p>
        </div>
      </div>
  )
}

export default More