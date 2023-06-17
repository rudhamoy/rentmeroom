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
  const searchParams = useSearchParams()!

  const [keyword, setKeyword] = useState<string>('')

  let link = "/api/rooms?limit=8"

  let queryTenants = searchParams.get("tenants")
  let queryMin = searchParams.get("min")
  let queryMax = searchParams.get("max")
  let queryRoomCategory = searchParams.get("roomCategory")

  useEffect(() => {
    if (searchParams.has("tenants")) {
      link = link.concat(`&tenants=${queryTenants}`)
    }

    if (searchParams.has("min")) {
      link = link.concat(`&min=${queryMin}`)
    }

    if (searchParams.has("max")) {
      link = link.concat(`&max=${queryMax}`)
    }

    if (searchParams.has("roomCategory")) {
      link = link.concat(`&roomCategory=${queryRoomCategory}`)
    }
  }, [queryTenants, queryMin, queryMax, queryRoomCategory])

  async function fetchRoomsByDefault() {
    const res = await axios.get(link)
    setSearchRes?.(res.data)
  }

  useEffect(() => {
    fetchRoomsByDefault()
  }, [])

  const searchHandler = async () => {
    const res = await axios.get(link)
    setSearchRes?.(res?.data)
    if (pathname !== "/search") {
      router.push('/search')
    }
  }



  return (
    <>
      {/* search , filter */}
      <div className={styles.filter__container}>
        {/* search field */}
        <div>
          <BiSearch
            role='button'
            onClick={searchHandler}
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
          <PriceRange onClick={searchHandler} />
          <TenantFilter onClick={searchHandler} />
          <RoomFilter onClick={searchHandler} />
          <div><span>Floor</span> <BsFilter /></div>
          <div><span>Parking</span> <BsFilter /></div>
          <More />
        </div>
      </div>

      {/* buttons */}
      <div style={{ display: "flex", gap: "1rem", marginLeft: "2.5rem" }}>
        {searchParams.has('tenants') && (
          <button style={{ padding: "6px", backgroundColor: "black", color: "white" }}>{queryTenants}</button>
        )}
        {searchParams.has('roomCategory') && (
          <button style={{ padding: "2px 4px", backgroundColor: "black", color: "white" }}>{queryRoomCategory}</button>
        )}
        {searchParams.has('min') && (
          <button style={{ padding: "2px 4px", backgroundColor: "black", color: "white" }}>{`${queryMin} - ${queryMax}`}</button>
        )}
      </div>
    </>

  )
}

export default FilterButton