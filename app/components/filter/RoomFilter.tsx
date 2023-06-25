'use client'
import { useCallback, useEffect, useState } from 'react'
import styles from './filter.module.css'
import { BsFilter } from 'react-icons/bs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface RoomFilterProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RoomFilter: React.FC<RoomFilterProps> = ({ onClick }) => {

    const [roomCategory, setRoomCategory] = useState<string>("")

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )

      useEffect(() => {
        if(roomCategory !== "") {
            router.push(pathname + '?' + createQueryString('roomCategory', roomCategory))
        }
      }, [roomCategory])

    return (
        <div className={styles.filter__sort}>
            <span>Room</span> <BsFilter />
            <div className={styles.filter__sortContainer} style={{width: "12rem"}}>
                <select onChange={e => setRoomCategory(e.target.value)} style={{width: "100%", padding: ".4rem"}}>
                    {["All", "1R", "1RK", "1BHK", "2R", "2RK", "2BHK", "3BHK"].map(room => (
                        <option key={room} value={room}>{room}</option>
                    ))}
                </select>
                <div>
                    <button
                    style={
                        {marginTop: "1rem", 
                        border: "none",
                        backgroundColor: "black",
                        color: "white",
                        padding: ".5rem"
                        }}
                    onClick={onClick}>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default RoomFilter