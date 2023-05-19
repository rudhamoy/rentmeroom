import styles from './home.module.css'
import { BsFilter } from 'react-icons/bs'

const FilterButton = () => {
  return (
    <div className={styles.filter__container}>
        <button><span>Sort</span> <BsFilter /></button>
        <button><span>Price</span> <BsFilter /></button>
        <button><span>Range Area</span> <BsFilter /></button>
        <button><span>Bedroom</span> <BsFilter /></button>
        <button><span>Bathroom</span> <BsFilter /></button>
        <button><span>Balcony</span> <BsFilter /></button>
        <button><span>Floor</span> <BsFilter /></button>
        <button><span>Parking</span> <BsFilter /></button>
    </div>
  )
}

export default FilterButton