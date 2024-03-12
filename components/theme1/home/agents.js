"use client";
import React, { useEffect } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { usePathname, useRouter } from 'next/navigation';
import { useFetch } from "../../../app/helpers/hooks";
import { agentsList } from "../../../app/helpers/backend";
import Link from 'next/link';
import { useI18n } from '../../../app/providers/i18n';



const Agents = ({ data }) => {
  const theme = "main";
  
  const i18n = useI18n();  

  return (
    <div className="py-28 md:py-12">
      <div className="flex flex-col items-center justify-center pt-12">
        {/* <h1 className={`text-${theme}-secondary paragraph_2 text-center`}>Our Team</h1> */}
        <div className="header_2 dark:text-white text-dark_text py-4 text-center">{i18n?.t('Meet With Team')}</div>
        <div className="container w-full flex items-center justify-center flex-wrap space-x-9 space-y-9">
          {/* <Slider {...settings} > */}
          {data?.docs?.map((member) => {
            return <Team member={member} key={member._id} />;
          })}

        </div>
        <div className='mt-8 text-center'>
          <Link
            href='/agents'
            className='header_5 text-secondary_text hover:text-primary hover:underline'
          >
            {i18n?.t('View All')}
          </Link>
        </div>
      </div>
    </div>
  );
};
const Team = ({ member }) => {
  const router = useRouter();

  return (
    <>
      <div>
        <Link href={`/agents/view/${member?._id}`}>
        <div className="group relative min-h-[450px] w-auto rounded-full transition-all ">
          <div className="h-[270px] lg:w-[270px] w-full">
            <img
              className="h-[270px] lg:w-[270px] mx-auto rounded-full transition-all group-hover:h-[400px] group-hover:rounded-[100px]"
              src={member?.image}
              alt="man"
            />
          </div>
          <div className="opacity-0 group-hover:opacity-100">
            <h1 className=" header_5 absolute left-1/2 top-8 -translate-x-1/2 transform text-white">
              {member?.name}
            </h1>
            <div className="absolute bottom-5 w-full text-white md:px-20 lg:px-10 px-28 pb-12 md:pb-20">
              <h1
                className="pb-5 text-center cursor-pointer hover:underline header_5"
                onClick={() => router.push(`/agents/view/${member?._id}`)}
              >
                {member?.name}
              </h1>
              <div className=" mb-8 flex justify-around md:mb-0">
                <span
                  className="header_5 cursor-pointer rounded-full border p-3 hover:bg-white hover:text-primary"
                  onClick={() => window.open(`${member?.facebook}`, "_blank")}
                >
                  <FaFacebookF></FaFacebookF>
                </span>
                <span
                  className="header_5 cursor-pointer rounded-full border p-3 hover:bg-white hover:text-primary"
                  onClick={() => window.open(`${member?.twitter}`, "_blank")}
                >
                  <FaTwitter></FaTwitter>
                </span>
                <span
                  className="header_5 cursor-pointer rounded-full border p-3 hover:bg-white hover:text-primary"
                  onClick={() => window.open(`${member?.instagram}`, "_blank")}
                >
                  <FaInstagram></FaInstagram>
                </span>
                <span
                  className="header_5 cursor-pointer rounded-full border p-3 hover:bg-white hover:text-primary"
                  onClick={() => window.open(`${member?.linkedin}`, "_blank")}
                >
                  <FaLinkedin />
                </span>
              </div>
            </div>
          </div>
        </div>
        </Link>
      </div>
    </>
  );
};
export default Agents;
