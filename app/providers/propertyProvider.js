"use client"
import React, { useEffect, useState } from 'react'
import { useFetch } from '../helpers/hooks';
import { propertyList } from '../helpers/backend';
import PropertyContext from '../contexts/property';
import { usePathname } from 'next/navigation';

const PropertyProvider = ({ children }) => {
    const [search, setSearch] = useState(false);
    const [data, getData, { loading }] = useFetch(propertyList);
    const path = usePathname()

    useEffect(() => {
        // if(path === '/property') {
            getData({
                search: undefined,
                type: undefined,
                bedrooms: undefined,
                bathrooms: undefined,
                
            })
        // }
    }, [search])

    return (
        <PropertyContext.Provider value={{ data, getData, loading, setSearch, search }}>{children}</PropertyContext.Provider>
    )
}

export default PropertyProvider