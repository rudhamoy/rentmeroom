'use client'
import { useCallback, useEffect, useState } from 'react'
import styles from './filter.module.css'
import { BsFilter } from 'react-icons/bs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface TenantFilterProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TenantFilter: React.FC<TenantFilterProps> = ({ onClick }) => {

    const [tenants, setTenants] = useState<string>("")

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
        if(tenants !== "") {
            router.push(pathname + '?' + createQueryString('tenants', tenants))
        }
      }, [tenants])

    return (
        <div className={styles.filter__sort}>
            <span>Tenants</span> <BsFilter />
            <div className={styles.filter__sortContainer}>
                <select onChange={e => setTenants(e.target.value)}>
                    {["All", "Students", "Family", "Girls", "Boys", "Bachelor"].map(tenant => (
                        <option key={tenant} value={tenant}>{tenant}</option>
                    ))}
                </select>
                <div>
                    <button onClick={onClick}>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default TenantFilter