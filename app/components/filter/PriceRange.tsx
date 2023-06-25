'use client'
import { useCallback, useEffect, useState } from 'react'
import styles from './filter.module.css'
import { BsFilter } from 'react-icons/bs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PriceRangeProps {
    // setMin: React.Dispatch<React.SetStateAction<number | undefined>>;
    // setMax: React.Dispatch<React.SetStateAction<number | undefined>>;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ onClick }) => {

    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(0)

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMin(parseInt(event.target.value));
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMax(parseInt(event.target.value));
    };

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
        if (min > 0) {
            router.push(pathname + '?' + createQueryString('min', min))
        }
        if (max > min) {
            router.push(pathname + '?' + createQueryString('max', max))
        }
    }, [min, max])

    return (
        <div className={styles.filter__sort}>
            <span>Price Range</span> <BsFilter />
            <div className={styles.filter__sortContainer}>
                <div>
                    <label htmlFor="minPrice">Min:</label>
                    <input type="number" onChange={handleMinChange} placeholder='3000' style={{padding: ".4rem"}} />
                </div>
                <div style={{marginTop: "1rem"}}>
                    <label htmlFor="minPrice">Max:</label>
                    <input type="number" onChange={handleMaxChange} placeholder='3000' style={{padding: ".4rem"}} />
                </div>
                <div>
                    <button
                        style={
                            {
                                marginTop: "1rem",
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

export default PriceRange