import React from 'react'
import styles from './home.module.css'
import { BsFilter } from 'react-icons/bs'

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
      
      <div className={styles.filter__toggle}>
        <button
          onClick={() => switchViewHandler('listView')}
          style={{ 
            backgroundColor: `${switchView === 'listView' ? "black" : "white"}`, 
            color: `${switchView === 'listView' ? "white" : "black"}`
          }}
        >List View</button>
        <button
          onClick={() => switchViewHandler('mapView')}
          style={{ 
            backgroundColor: `${switchView === 'mapView' ? "black" : "white"}`, 
            color: `${switchView === 'mapView' ? "white" : "black"}`
          }}
        >Map View</button>
      </div>

      <button><span>Sort</span> <BsFilter /></button>
      <button><span>Price</span> <BsFilter /></button>
      <button><span>Range Area</span> <BsFilter /></button>
      <button><span>Bedroom</span> <BsFilter /></button>
      <button><span>Bathroom</span> <BsFilter /></button>
      <button><span>Floor</span> <BsFilter /></button>
      <button><span>Parking</span> <BsFilter /></button>
    </div>
  )
}

export default FilterButton