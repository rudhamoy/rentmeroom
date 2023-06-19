'use client'
import { useState } from 'react'
import styles from './search.module.css'
import FilterButton from '@/components/filter/FilterButton'
import RoomCard from '@/components/rooms/RoomCard'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SearchPage = () => {
  const [searchRes, setSearchRes] = useState({})

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  let queryParams
  if (typeof window !== undefined) {
    queryParams = new URLSearchParams(window.location.search)
  }

  const numberOfRooms = searchRes?.length || 0;

  
  let queryTenants = searchParams.get("tenants")
  let queryMin = searchParams.get("min")
  let queryMax = searchParams.get("max")
  let queryRoomCategory = searchParams.get("roomCategory")
  
  const deleteQuery = async (queryString: string) => {
    queryParams.delete(queryString)
    router.push(pathname + '?' + queryParams.toString())
  }

  return (
    <div style={{marginTop: "8rem"}}>
      <FilterButton setSearchRes={setSearchRes} />


      {/* buttons */}
      <div style={{ display: "flex", gap: "1rem", marginLeft: "2.5rem" }}>
        {(searchParams.has('tenants') && queryTenants !== "All") && (
          <button
            style={{ padding: "6px", backgroundColor: "black", color: "white" }}
            onClick={() => deleteQuery('tenants')}
          >{queryTenants} <span>x</span></button>
        )}
        {(searchParams.has('roomCategory') && queryRoomCategory !== "All") && (
          <button 
          style={{ padding: "2px 4px", backgroundColor: "black", color: "white" }}
          onClick={() => deleteQuery('roomCategory')}
          >{queryRoomCategory} <span>x</span></button>
        )}
        {searchParams.has('min') && (
          <button style={{ padding: "2px 4px", backgroundColor: "black", color: "white" }}>{`${queryMin} - ${queryMax}`} <span>x</span></button>
        )}
      </div>

      <div className={styles.searchContent}>
       {Object.keys(searchRes).length !== 0 && (
         <p>Found <span>{searchRes?.filteredRoomCount} results</span></p>
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