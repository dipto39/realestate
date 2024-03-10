"use client"
import MainLoader from '../../../../components/common/loader';
import Agent_Profile from '../../../../components/theme2/profile/agent_profile';
import { useUser } from '../../../contexts/user';
import { fetchUser } from '../../../helpers/backend';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Agetn_Profile() {
  const router = useRouter();
  const { active, setActive } = useUser()

  const [user, setUser] = useState(null)
  useEffect(() => {
    fetchUser().then(({ error, data }) => {
      if (error === false && data.role === "agent") {
        if(active !== 'add-property') {

          setActive("dashboard")
        }
        // hideLoader();
        setUser(data);
      } else {
        router.push("/login");
      }
    });
  }, []);

  if (!user?.role === "agent") {
    router.push("/login");
    return (
      <>
        <MainLoader />
      </>
    );
  }

  return (
    <>
      {
        user?.role === "agent" &&
        <Agent_Profile />
      }
    </>
  )
}

export default Agetn_Profile