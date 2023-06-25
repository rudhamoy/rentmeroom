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
  const [addressList, setAddressList] = useState([])
  const [selectedAddress, setSelectedAddress] = useState("")
  const [showSearch, setShowSearch] = useState<boolean>(false)

  let link = "/api/rooms?limit=8"

  let queryTenants = searchParams.get("tenants") //get tenant from query params
  let queryMin = searchParams.get("min") // get min price range from query params
  let queryMax = searchParams.get("max") // get max price range from query params
  let queryRoomCategory = searchParams.get("roomCategory") //get room category from query params

  // fetch address for auto-suggest while input
  const fetchAddress = async () => {
    if(keyword !== "") {
      const res = await axios.get(`/api/address?locality=${keyword}`)
      setAddressList(res.data)
      setShowSearch(true)
    } else {
      setAddressList([])
      setShowSearch(false)
    }
  }

  useEffect(() => {
    fetchAddress() //call this when there is keyword value change
  }, [keyword])

  /**
   * fetch room list by defaults when search page first render
   * when search keyword provided - use this function call to fetch the room list
   */
  async function fetchRoomsByDefault() {
    let links
    if (pathname !== '/search' && keyword !== "") {
      router.push(`/search?location=${selectedAddress}`) //add to query params url
      links = '/api/rooms' + window.location.search
    } else {
      router.push(`/search?location=${selectedAddress}`)
      links = `/api/rooms?location=${selectedAddress}`
    }
    const res = await axios.get(links)
    setSearchRes?.(res.data)
  }

  // filter function
  async function searchQuery() {
    let links = '/api/rooms' + window.location.search
    const res = await axios.get(links)
    setSearchRes?.(res.data)
  }

  //onchnage handler for search input - address/location
  const onChangeHandler = (e) => {
    setSelectedAddress("")
    setKeyword(e.target.value)
  }


  useEffect(() => {
    searchQuery()
  }, [queryTenants, queryRoomCategory])

  // onclick handler to select address from the address list - autosuggestion
  const selectAddressHandler = (addressValue) => {
    setShowSearch(false)
    setSelectedAddress(addressValue)
  }


  return (
    <>
      {/* search , filter */}
      <div className={styles.filter__container} style={{borderBottomLeftRadius: `${showSearch === true ? "0rem" : '2rem'}`}}>

        {/* search field */}
        <div className={styles.filter__searchContainer}>
          <div className={styles.filter__search}>
            <BiSearch
              role='button'
              onClick={fetchRoomsByDefault}
              style={{
                color: "GrayText",
                fontSize: "1.8rem",
                background: "lightgrey",
                borderRadius: "50%",
                padding: ".7rem",
                cursor: "pointer",
                zIndex: 890,
              }}
            />
            <input
              placeholder='Search home via locality'
              value={selectedAddress !== "" ? selectedAddress : keyword}
              onChange={onChangeHandler}
            />
          </div>
          {(addressList?.addresses?.length > 0 && showSearch === true) && (
          <div className={styles.autoSuggestion}>
            <ul>
              {addressList.addresses.map(address => (
                <li 
                onClick={() => selectAddressHandler(address.address)}
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  margin: "1rem"
                }}
                >{address.address}</li>
              ))}
            </ul>
          </div>
          )}
        </div>

        <div className={styles.filter__filterContainer}>
          {/* sort filter */}
          <PriceRange onClick={searchQuery} />
          <TenantFilter onClick={searchQuery} />
          <RoomFilter onClick={searchQuery} />
          {/* <div><span>Floor</span> <BsFilter /></div>
          <div><span>Parking</span> <BsFilter /></div> */}
          <More />
        </div>
      </div>
    </>

  )
}

export default FilterButton