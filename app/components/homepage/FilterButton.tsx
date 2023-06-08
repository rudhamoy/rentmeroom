import React from 'react'
import styles from './home.module.css'
import { BsFilter } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'

interface FilterProps {
  switchView: string;
  setSwitchView:  React.Dispatch<React.SetStateAction<string>>;
}

const FilterButton:React.FC<FilterProps> = ({switchView, setSwitchView}) => {

  const switchViewHandler = (viewType: string) => {
    if (viewType === 'mapView') {
      setSwitchView(viewType)
    } else {
      setSwitchView(viewType)
    }
  }

  return (
    <div className={styles.filter__container}>
      <div>
        <BiSearch 
        style={{
          color: "GrayText", 
          fontSize: "1.8rem", 
          background: "lightgrey", 
          borderRadius: "50%", 
          padding: ".7rem",
          cursor: "pointer"
        }}
        />
        <input placeholder='Search home via place, area, pincode' />
      </div>
      <div>
      <div><span>Sort</span> <BsFilter /></div>
      <div><span>Price</span> <BsFilter /></div>
      <div><span>Range Area</span> <BsFilter /></div>
      <div><span>Bedroom</span> <BsFilter /></div>
      <div><span>Bathroom</span> <BsFilter /></div>
      <div><span>Floor</span> <BsFilter /></div>
      <div><span>Parking</span> <BsFilter /></div>
      </div>
    </div>
  )
}

export default FilterButton