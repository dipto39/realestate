"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import UserContext from "../contexts/user";
import { fetchUser } from "../helpers/backend";
import PropertyProvider from "./propertyProvider";


const Providers = ({ children }) => {
    const [active, setActive] = useState('dashboard')

    const [user, setUser] = useState({});
    const router = useRouter();
    useEffect(() => {
        getUser();
    }, [user?._id])

    const getUser = async () => {
        const { data, error } = await fetchUser();
        if (error === false) {
            setUser(data);
        } else {
            // router.push("/");
            setUser({});
        }
    };


    return (
        <UserContext.Provider value={{ user, setUser, getUser, active, setActive }}>
            <SkeletonTheme color="#0F172A" highlightColor="#444">
                <PropertyProvider>
                    {children}
                </PropertyProvider>
            </SkeletonTheme>
        </UserContext.Provider>
    )
}

export default Providers;