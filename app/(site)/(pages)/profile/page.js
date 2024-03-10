"use client"
import React from 'react'
import { useUser } from '../../../contexts/user'
import { useRouter } from 'next/navigation'
import UserProfile from '../../../../components/theme2/profile/user_profile'

const Profile = () => {

    const { user } = useUser()
    const { push } = useRouter()

    if (!user) {
        push('/login')
    }

    return (
        <UserProfile></UserProfile>
    )
}

export default Profile