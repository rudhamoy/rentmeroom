'use client'
import { useState, useEffect } from 'react'
import styles from './filter.module.css'
import { BsFilter } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import More from './More'
import PriceRange from './PriceRange'
import TenantFilter from './TenantFilter'
import RoomFilter from './RoomFilter'

interface FilterProps {
  setSearchRes?: React.Dispatch<React.SetStateAction<object>>;
}

const FilterButton: React.FC<FilterProps> = ({ setSearchRes }) => {

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [keyword, setKeyword] = useState<string>('')

  let link = "/api/rooms?limit=8"

  let queryTenants = searchParams.get("tenants")
  let queryMin = searchParams.get("min")
  let queryMax = searchParams.get("max")
  let queryRoomCategory = searchParams.get("roomCategory")


  let queryParams
  if (typeof window !== undefined) {
    queryParams = new URLSearchParams(window.location.search)
  }

  async function fetchRoomsByDefault() {
    let links = '/api/rooms' + window.location.search
    const res = await axios.get(links)
    setSearchRes?.(res.data)
  }

  const deleteTenantsQuery = async () => {
    queryParams.delete('tenants')
    router.push(pathname + '?' + queryParams.toString())
  }

  useEffect(() => {
    fetchRoomsByDefault()
  }, [queryTenants])

  return (
    <>
      {/* search , filter */}
      <div className={styles.filter__container}>
        {/* search field */}
        <div>
          <BiSearch
            role='button'
            onClick={fetchRoomsByDefault}
            style={{
              color: "GrayText",
              fontSize: "1.8rem",
              background: "lightgrey",
              borderRadius: "50%",
              padding: ".7rem",
              cursor: "pointer"
            }}
          />
          <input placeholder='Search home via locality' onChange={e => setKeyword(e.target.value)} />
        </div>
        <div>
          {/* sort filter */}
          <PriceRange onClick={fetchRoomsByDefault} />
          <TenantFilter onClick={fetchRoomsByDefault} />
          <RoomFilter onClick={fetchRoomsByDefault} />
          <div><span>Floor</span> <BsFilter /></div>
          <div><span>Parking</span> <BsFilter /></div>
          <More />
        </div>
      </div>

      {/* buttons */}
      <div style={{ display: "flex", gap: "1rem", marginLeft: "2.5rem" }}>
        {(searchParams.has('tenants') && queryTenants !== "All") && (
          <button
            style={{ padding: "6px", backgroundColor: "black", color: "white" }}
            onClick={deleteTenantsQuery}
          >{queryTenants} <span>x</span></button>
        )}
        {(searchParams.has('roomCategory') && queryRoomCategory !== "All") && (
          <button style={{ padding: "2px 4px", backgroundColor: "black", color: "white" }}>{queryRoomCategory} <span>x</span></button>
        )}
        {searchParams.has('min') && (
          <button style={{ padding: "2px 4px", backgroundColor: "black", color: "white" }}>{`${queryMin} - ${queryMax}`} <span>x</span></button>
        )}
      </div>
    </>

  )
}

export default FilterButton