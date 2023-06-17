'use client'
import { useState } from 'react'
import styles from './search.module.css'
import FilterButton from '@/components/filter/FilterButton'
import RoomCard from '@/components/rooms/RoomCard'

const SearchPage = () => {
  const [searchRes, setSearchRes] = useState({})

  const numberOfRooms = searchRes?.length || 0;

  return (
    <div style={{marginTop: "8rem"}}>
      <FilterButton setSearchRes={setSearchRes} />

      <div className={styles.searchContent}>
       {Object.keys(searchRes).length !== 0 && (
         <p>Found <span>{searchRes?.total} results</span></p>
       )}

       {/* contents */}
       <div 
            className={styles.searchContent__results}
            >
                {searchRes?.rooms?.map((room) => (
                    <RoomCard key={room._id} room={room} />
                ))}

                 {/* 
                  this add extra element when there's is ODD number of room listed but hides when EVEN number of room is listed 
                  REASON:- to align the last element to the left instead of positioning to  the center
                  */}
                {Math.floor((numberOfRooms % 2)) !== 0 && (
                  <div style={{ height: "12.5rem", width: "32rem", padding: "0.2rem" }}></div>
                )}
            </div>
      </div>
    </div>
  )
}

export default SearchPage