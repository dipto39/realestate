"use client";
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFetch } from '../../../app/helpers/hooks';
import { blogListLatest } from '../../../app/helpers/backend';
import dayjs from 'dayjs';
import FrontPagination from '../common/pagination';
import PopularNews from './popularNews';
import NewsCategory from './newsCategory';
import { useI18n } from '../../../app/providers/i18n';


function News() {
  const i18n = useI18n();
  const [data, getData, { loading }] = useFetch(blogListLatest);
  const router = useRouter();
  return (
    <section className="">
      <div className="container mx-auto lg:flex block py-20 lg:py-32">
        <div className="basis-2/3 lg:pr-10 px-5">
          <div className="grid md:grid-cols-2 gap-5 mb-4">
            {
              data?.docs?.map((item, index) => (
                <div key={index} className='relative h-[450px] rounded-lg group cursor-pointer'
                  onClick={() => router.push(`/news/view/${item._id}`)}
                >
                  <img className='h-full w-full rounded-lg' src={item.image} alt='' />
                  <div className='absolute bottom-0 left-8 right-0 border-l-4 border-white group-hover:border-primary bg-white bg-opacity-90 object-cover p-5 transition-all ease-in-out'>
                    <h1 className='header_4_bold text-dark_text'>
                      {item?.title?.length > 20 ? item?.title.slice(0, 20) + '...' : item?.title}
                    </h1>
                    {/* <div className='paragraph_3 py-3 text-secondary_text' dangerouslySetInnerHTML={{ __html: item.details.length > 50 ? item.details.slice(0, 50) + '...' : item.details }}></div> */}
                    <p className='paragraph_3 py-3 text-secondary_text'>
                      {
                        item?.short_description?.length > 50 ? item?.short_description.slice(0, 50) + '...' : item?.short_description
                      }
                    </p>
                    <div className='flex items-center justify-between py-4'>
                      <p className='text-xs font-bold text-secondary_text'>
                        {dayjs(item.createdAt).format('MMMM, DD YYYY')}
                      </p>
                      <Link href={`/news/view/${item._id}`} className='header_7 text-dark_text underline group-hover:text-primary'>
                        {i18n.t("Read More")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='flex text-center justify-start mt-20'>
            <FrontPagination totalPages={data?.totalPages} page={data?.page} total={data?.totalDocs} limit={data?.limit} onPageChange={(page) => getData({ "page": page })} />
          </div>
        </div>
        <div className="basis-1/3 lg:mt-0 mt-5">
          <PopularNews />
          <NewsCategory getData={getData} />
        </div>
      </div>
    </section>
  )
}

export default News