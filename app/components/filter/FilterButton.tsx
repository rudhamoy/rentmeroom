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

  async function fetchRoomsByDefault() {
    let links
    if(pathname !== '/search' && keyword !== "") {
      router.push(`/search?location=${keyword}`)
      links = '/api/rooms' + window.location.search
    } else {
      router.push(`/search?location=${keyword}`)
      links = `/api/rooms?location=${keyword}`
    }
    const res = await axios.get(links)
    setSearchRes?.(res.data)
  }

  // useEffect(() => {
  //   fetchRoomsByDefault()
  // }, [])

  async function searchQuery() {
    let links = '/api/rooms' + window.location.search
    const res = await axios.get(links)
    setSearchRes?.(res.data)
  }


  useEffect(() => {
    searchQuery()
  }, [queryTenants, queryRoomCategory])

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
          <PriceRange onClick={searchQuery} />
          <TenantFilter onClick={searchQuery} />
          <RoomFilter onClick={searchQuery} />
          <div><span>Floor</span> <BsFilter /></div>
          <div><span>Parking</span> <BsFilter /></div>
          <More />
        </div>
      </div>

      
    </>

  )
}

export default FilterButton