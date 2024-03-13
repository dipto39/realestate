"use client"
import Link from 'next/link';
import { MdCategory } from "react-icons/md";
import { FaCaretDown, FaSearch } from 'react-icons/fa';
import {
    FaEllipsisVertical,
    FaHouseChimneyWindow,
    FaLocationDot,
    FaLocationPin,
} from 'react-icons/fa6';
import { useProperty } from '../../../app/contexts/property';
import FormInput from '../../form/input';
import { Form, Select } from 'antd';
import { cities, countries } from "country-cities";
import { useEffect, useState } from 'react';
import FormSelect from '../../form/select';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../app/providers/i18n';
import Btn from '../../common/btn/btn';
import { propertyCategories } from '../../../app/helpers/backend';
import { useFetch } from '../../../app/helpers/hooks';


const Hero = ({ home3, jsonData }) => {
    const [categories, getCategories] = useFetch(propertyCategories);
    const { getData, setSearch, search } = useProperty();
    const [selectedCountry, setSelectedCountry] = useState('')
    const router = useRouter()
    const i18n = useI18n();
    const [type, setType] = useState(undefined)

    const [auCities, setAuCities] = useState([])

    useEffect(() => {
        if (!!selectedCountry) {
            setAuCities(cities.getByCountry(selectedCountry));
        }
    }, [selectedCountry])

    return (
        <section
            className={`relative flex justify-between ${home3 ? '-mt-0 h-[600px] md:h-[825px]' : '-mt-[103px] h-[760px] md:h-[965px]'}`}
        >
            <div className='basis-1/2  bg-secondary'></div>
            {home3 ? (
                <div className={`basis-1/2 bg-secondary ${home3 ? "pt-20" : ""}`}>
                    {jsonData?.hero_section?.hero_section_image_home3[0]?.url ? <div className=''>
                        <img src={jsonData?.hero_section?.hero_section_image_home3[0]?.url} alt='' />
                    </div> : <div className=''>
                        <img src={jsonData?.hero_section?.hero_section_image_home3} alt='' />
                    </div>}
                </div>
            ) :
                jsonData?.hero_section?.hero_section_image[0]?.url ? <div className={`basis-1/2 bg-cover bg-no-repeat object-contain`} style={{ backgroundImage: `url(${jsonData?.hero_section?.hero_section_image[0]?.url})` }}></div> : <div className={`basis-1/2 bg-cover bg-no-repeat object-contain`} style={{ backgroundImage: `url(${jsonData?.hero_section?.hero_section_image})` }}></div>

            }

            <div className={`container home_search absolute left-1/2 block h-full  w-full -translate-x-1/2 transform lg:flex ${home3 ? 'bottom-56' : 'bottom-0'}`}>
                <div className='flex h-[730px] md:h-[965px] basis-1/2 items-center justify-center'>
                    <div className={`${home3 ? "pt-[8rem]" : ""}`}>
                        <h1 className='header_1 py-5 text-white'>{jsonData?.hero_section?.heading}</h1>
                        <div className='my-10 flex'>
                            <div className='me-5 w-1 bg-primary'></div>
                            <p className='paragraph_1 text-secondary_text'>
                                {jsonData?.hero_section?.description}
                            </p>
                        </div>
                        <div className='md:mb-10  flex text-white'>
                            {/* <Link href='/property' onClick={() => setSearch(!search)} className='header_5 rounded-sm  rounded-tr-3xl bg-primary px-7 py-2 text-lg text-white transition-all ease-in-out hover:bg-hover_color flex justify-center items-center'>
                                <button>
                                    {i18n.t('Find Property')}
                                </button>
                            </Link> */}
                            <Link href='/property' onClick={() => setSearch(!search)}>
                                <Btn>
                                    <h1 className='header_5'>{i18n.t('Find Property')}</h1>
                                </Btn>
                            </Link>
                            <div className='ms-10'>

                                <img className='' src='./video.png' alt='' />
                            </div>
                        </div>
                        <div className='my-5 flex text-white'>
                            <button onClick={() => setType(undefined)} className={`header_5 me-6 ${type === undefined ? 'underline text-primary' : ''}`}>
                                {i18n?.t('All')}
                            </button>

                            <button onClick={() => {
                                setType('sale')
                                getData({ type: 'sale' })
                            }} className={`header_5 me-6 ${type === 'sale' ? 'underline text-primary' : ''}`}>
                                {i18n.t('Sale')}
                            </button>
                            <button onClick={() => {
                                setType('rent')
                                getData({ type: 'rent' })
                            }} className={`header_5 me-6 ${type === 'rent' ? 'underline text-primary' : ''}`}>
                                {i18n.t('Rent')}
                            </button>
                        </div>
                        <div className=' hidden rounded-lg bg-white bg-opacity-40 p-2 text-white'>
                            <Form layout='vertical' onFinish={(values) => {
                                // console.log(values, type)
                                getData({
                                    ...values,
                                    type: type
                                })
                                { (values?.location || values?.city || values?.country || type) && router.push('/property') }
                                { type === undefined && router.push('/property') }
                            }}>
                                    <MdCategory className='text-white' />
                                <div className='w-full mt-4'>
                                    <Form.Item name='category'>
                                        <Select
                                            allowClear
                                            showSearch
                                            
                                            placeholder='Select Category'
                                            
                                            options={categories?.map((item) => {
                                                return { value: item?._id, label: item?.name }
                                            })}
                                        />
                                    </Form.Item>
                                </div>
                                <div className='flex items-center'>
                                    <span>
                                        <FaLocationDot></FaLocationDot>
                                    </span>
                                    <span className='px-5'>{i18n?.t('Location')}</span>
                                    <Form.Item name={'country'} className='w-full text-white'>
                                        <Select onChange={(e) => {
                                            const selectedCountry = countries?.all()?.find(country => country.name === e)
                                            setSelectedCountry(selectedCountry?.isoCode)
                                        }} placeholder={'Select Country'} allowClear showSearch>
                                            {
                                                countries?.all()?.map(d => (
                                                    <option key={d?.isoCode} label={d?.name} className='bg-transparent text-black' value={d?.name}>{d?.name}</option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className='flex items-center'>
                                    <span>
                                        <FaHouseChimneyWindow></FaHouseChimneyWindow>
                                    </span>
                                    <span className='px-5'>{i18n?.t('City')}</span>


                                    <Form.Item name={'city'} className='w-full'>
                                        {
                                            <Select placeholder={i18n?.t('Select City')} allowClear showSearch>
                                                {
                                                    auCities?.map(d => (
                                                        <option key={d?.name} label={d?.name} className='bg-transparent text-black' value={d?.name}>{d?.name}</option>
                                                    ))
                                                }
                                            </Select>
                                        }
                                    </Form.Item>
                                </div>
                                {/* <button>
                                    Advance{' '}
                                    <span>
                                        <FaEllipsisVertical></FaEllipsisVertical>
                                    </span>
                                </button> */}
                                <button className='bg-secondary text-white'>
                                    <FaSearch></FaSearch>
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className='basis-1/2'></div>
            </div>
            <div className={` container absolute left-1/2 mx-auto  -translate-x-1/2 transform md:bottom-28 ${home3 ? 'top-[27rem] md:top-[36rem] ' : 'bottom-0'} ${home3 ? "" : ""}`}>
                <div className={`w-full rounded-md p-2 lg:p-5 text-white shadow-md ${home3 ? 'lg:w-[75%] bg-[#365C70] bg-gradient-to-b from-[#668391] to-[#184359]' : 'lg:w-[75%] bg-[#365C70] bg-opacity-70'}`}>
                    <div className=''>
                        <Form layout='vertical' autoComplete='off' onFinish={(values) => {
                            
                            getData({
                                ...values,
                                type: type
                            })
                            { (values?.location || values?.city || values?.country || type) && router.push('/property') }
                            { type === undefined && router.push('/property') }
                        }} className='filter-home'>
                            <div className='grid grid-cols-3 items-center justify-between md:flex'>
                                <div className='paragraph_2 gap-2 flex items-center px-5  md:w-auto w-full'>
                                    <MdCategory className='text-white' />
                                    <div className='w-full'>
                                    <Form.Item name='category'>
                                        <Select
                                            allowClear
                                           
                                            showSearch
                                            // style={{
                                            //     width: '100%',
                                            //     borderRadius: '0px',
                                            // }}
                                            placeholder='Select Category'
                                            // optionFilterProp='children'
                                            // filterOption={(input, option) =>
                                            //     (option?.label ?? '').includes(input)
                                            // }
                                            // filterSort={(optionA, optionB) =>
                                            //     (optionA?.label ?? '')
                                            //         .toLowerCase()
                                            //         .localeCompare((optionB?.label ?? '').toLowerCase())
                                            // }
                                            options={categories?.map((item) => {
                                                return { value: item?._id, label: item?.name }
                                            })}
                                        />
                                    </Form.Item>
                                </div>
                                </div>
                                <div className='paragraph_2 flex items-center border-gray-400 px-5  w-full md:border-l-2 md:border-r-2'>
                                    <FaLocationDot className='text-white' />
                                    <Form.Item name={'country'} className='w-full text-white'>
                                        <Select onChange={(e) => {
                                            console.log(e)
                                            const selectedCountry = countries?.all()?.find(country => country.name === e)
                                            setSelectedCountry(selectedCountry?.isoCode)
                                        }} placeholder={i18n?.t('Select Country')} allowClear showSearch>
                                            {
                                                countries?.all()?.map(d => (
                                                    <option key={d?.isoCode} label={d?.name} className='bg-transparent text-black' value={d?.name}>{d?.name}</option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className='paragraph_2 flex items-center px-5 w-full'>
                                    <FaHouseChimneyWindow className='text-white' />
                                    <Form.Item name={'city'} className='w-full'>
                                        {
                                            <Select placeholder={'Select City'} allowClear showSearch>
                                                {
                                                    auCities?.map(d => (
                                                        <option key={d?.name} label={d?.name} className='bg-transparent text-black' value={d?.name}>{d?.name}</option>
                                                    ))
                                                }
                                            </Select>
                                        }
                                    </Form.Item>
                                </div>

                                <button className='header_4 lg:col-span-1 flex justify-center col-span-3 rounded-lg bg-secondary p-2 lg:p-5 md:col-auto text-white'>
                                    <FaSearch />
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;
