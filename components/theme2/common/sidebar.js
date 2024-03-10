'use client'
import React, { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Button, Radio, Col, Form, Row, Select, Slider, Input } from 'antd';
import FormInput from '../../form/input';
import { AiOutlineClear } from 'react-icons/ai';

const options = [
    {
        value: '1',
        label: 'Not Identified',
    },
    {
        value: '2',
        label: 'Closed',
    },
    {
        value: '3',
        label: 'Communicated',
    },
    {
        value: '4',
        label: 'Identified',
    },
    {
        value: '5',
        label: 'Resolved',
    },
    {
        value: '6',
        label: 'Cancelled',
    },
]

const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

const Sidebar = ({ data, getData }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            ...data
        })
    }, [data])

    const [active, setActive] = React.useState('');


    return (
        <>
            <form className='w-full' onSubmit={(e) => {

                e.preventDefault()
                console.log(e.target.search.value)
                getData({
                    search: e.target.search.value,
                })
            }}>
                <div className='flex w-full'>
                    <div className='w-full'>
                        <input
                            name='search'
                            type='text'
                            className='input input-bordered h-14 w-full border border-tertiary_text p-5 focus:border-secondary_text focus:bg-white focus:outline-none '
                            placeholder='Search Here'
                        ></input>
                    </div>
                    <button className='button_paragraph h-14 bg-primary px-4 text-white'>
                        <FiSearch className='h-6 w-6' />
                    </button>
                </div>
            </form>
            <div className='mt-5 w-full p-5 shadow-lg pb-10 rounded-md'>
                <Form form={form} onFinish={(values) => {
                    if (values?.price) {
                        values.max_price = values.price[1];
                        values.min_price = values.price[0];
                        delete values.price;
                    }
                    if (values?.area) {
                        values.max_area = values.area[1];
                        values.min_area = values.area[0];
                        delete values.area;
                    }
                    getData({ ...values, search: values?.location });
                    form.resetFields();
                }}>

                    <div className="mt-8">
                        <div className='paragraph_9 text-dark_text items-center flex justify-between'>
                            <h3 className=''>Location</h3>
                            <AiOutlineClear onClick={() => {
                                getData({ 
                                    search: undefined,
                                 })
                                form.resetFields(['location'])
                                setActive('')
                            }} size={20} color='gray' className='cursor-pointer' />
                        </div>
                        <div className='w-full mt-4'>

                            <FormInput placeholder='Enter Location' onChange={(e) => {
                                getData({ search: e.target.value })
                                setActive('location')
                            }} name='location'></FormInput>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className='paragraph_9 text-dark_text items-center flex justify-between'>
                            <h3 className=''>Property Type</h3>
                            <AiOutlineClear onClick={() => {
                                getData({ 
                                    type: undefined,
                                })
                                form.resetFields(['type'])
                                setActive('')

                            }} size={20} color='gray' className='cursor-pointer' />
                        </div>
                        <div className='w-full mt-4'>
                            <Form.Item name='type'>
                                <Select
                                    allowClear
                                    onChange={(e) => {
                                        getData({
                                            type: e
                                        })
                                        setActive('type')
                                    }}
                                    showSearch
                                    style={{
                                        width: '100%',
                                        borderRadius: '0px',
                                    }}
                                    placeholder='Select Property Type'
                                    optionFilterProp='children'
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').includes(input)
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        { value: 'rent', label: 'Rent' },
                                        { value: 'sale', label: 'Sale' },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className='paragraph_9 text-dark_text items-center flex justify-between'>
                            <h3 className=''>Bedrooms</h3>
                             <AiOutlineClear onClick={() => {
                                getData({
                                    bedrooms: undefined,
                                 })
                                form.resetFields(['bedrooms'])
                                setActive('')
                            }} size={20} color='gray' className='cursor-pointer' />
                        </div>
                        <div className='w-full mt-4'>
                            <Form.Item name='bedrooms'>
                                <Radio.Group
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={(e) => {
                                        getData({
                                            bedrooms: e.target.value
                                        })
                                        setActive('bedrooms')
                                    }}
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Radio value="1">
                                                <p className='paragraph_9 text-secondary_text'>1 Room</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="7">
                                                <p className='paragraph_9 text-secondary_text'>7 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio value="2">
                                                <p className='paragraph_9 text-secondary_text'>2 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="8">
                                                <p className='paragraph_9 text-secondary_text'>8 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio value="3">
                                                <p className='paragraph_9 text-secondary_text'>3 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="9">
                                                <p className='paragraph_9 text-secondary_text'>9 Rooms</p>
                                            </Radio>
                                        </Col>

                                        <Col span={12}>
                                            <Radio value="4">
                                                <p className='paragraph_9 text-secondary_text'>4 Room</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="10">
                                                <p className='paragraph_9 text-secondary_text'>10 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio value="5">
                                                <p className='paragraph_9 text-secondary_text'>5 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="11" offset={2}>
                                                <p className='paragraph_9 text-secondary_text'>11 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio value="6">
                                                <p className='paragraph_9 text-secondary_text'>6 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="12">
                                                <p className='paragraph_9 text-secondary_text'>12 Rooms</p>
                                            </Radio>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className='paragraph_9 text-dark_text items-center flex justify-between'>
                            <h3 className=''>Bathrooms</h3>
                           <AiOutlineClear onClick={() => {
                                getData({ 
                                    bathrooms: undefined
                                })
                                form.resetFields(['bathrooms'])
                                setActive('')
                            }} size={20} color='gray' className='cursor-pointer' />
                        </div>
                        <div className='w-full mt-4'>
                            <Form.Item name='bathrooms'>
                                <Radio.Group
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={(e) => {
                                        getData({
                                            bathrooms: e.target.value
                                        })
                                        setActive('bathrooms')
                                    }}
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Radio value="1">
                                                <p className='paragraph_9 text-secondary_text'>1 Room</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="7">
                                                <p className='paragraph_9 text-secondary_text'>7 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio value="2">
                                                <p className='paragraph_9 text-secondary_text'>2 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="8">
                                                <p className='paragraph_9 text-secondary_text'>8 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio value="3">
                                                <p className='paragraph_9 text-secondary_text'>3 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="9">
                                                <p className='paragraph_9 text-secondary_text'>9 Rooms</p>
                                            </Radio>
                                        </Col>

                                        <Col span={12}>
                                            <Radio value="4">
                                                <p className='paragraph_9 text-secondary_text'>4 Room</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="10">
                                                <p className='paragraph_9 text-secondary_text'>10 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio value="5">
                                                <p className='paragraph_9 text-secondary_text'>5 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="11">
                                                <p className='paragraph_9 text-secondary_text'>11 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio value="6">
                                                <p className='paragraph_9 text-secondary_text'>6 Rooms</p>
                                            </Radio>
                                        </Col>
                                        <Col span={10} offset={2}>
                                            <Radio value="12">
                                                <p className='paragraph_9 text-secondary_text'>12 Rooms</p>
                                            </Radio>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className='paragraph_9 text-dark_text items-center flex justify-between'>
                            <h3 className=''>Area (m<sup>2</sup>)</h3>
                             <AiOutlineClear onClick={() => {
                                getData({
                                    max_area: undefined,
                                })
                                form.resetFields(['area'])
                                setActive('')

                            }} size={20} color='gray' className='cursor-pointer' />
                        </div>

                        <div className='w-full border rounded border-opacity-50 border-secondary_text p-4 mt-4'>
                            <div className="">
                                <Form.Item name='area'>
                                    <Slider
                                        onChange={(e) => {
                                            console.log(e)
                                            getData({
                                                max_area: e[1],
                                                min_area: e[0]
                                            })
                                            setActive('area')
                                        }}
                                        min={0}
                                        max={6200}
                                        range={{
                                            draggableTrack: true,
                                        }}
                                    // defaultValue={[200, 1500]}

                                    />
                                </Form.Item>
                            </div>
                            <p className='paragraph_7 mt-1 !font-bold text-secondary_text' >
                                0 m<sup>2</sup> - 6500 m<sup>2</sup>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className='paragraph_9 text-dark_text items-center flex justify-between'>
                            <h3 className=''>Price</h3>
                             <AiOutlineClear onClick={() => {
                                getData({
                                    max_price: undefined,
                                    min_price: undefined
                                })
                                form.resetFields(['price'])
                                setActive('')
                            }} size={20} color='gray' className='cursor-pointer' />
                        </div>

                        <div className='w-full border border-opacity-50 rounded border-secondary_text p-4 mt-4'>
                            <div className="">
                                <Form.Item name='price' >
                                    <Slider
                                        onChange={(e) => {
                                            getData({
                                                max_price: e[1],
                                                min_price: e[0]
                                            })

                                            setActive('price')
                                        }}
                                        min={0}
                                        max={5000}
                                        range={{
                                            draggableTrack: true,
                                        }}
                                    // defaultValue={[2000, 4500]}

                                    />
                                </Form.Item>
                            </div>
                            <p className='paragraph_7 mt-1 !font-bold text-secondary_text' >
                                Price Range: $0 -$5000
                            </p>
                        </div>
                    </div>

                    {/* <div className="mt-8">
                        <button className='w-full bg-primary text-white h-14 hover:bg-hover_color !border-0 transition duration-300 ease-in-out rounded-md'
                        >
                            <p className='paragraph_9 !text-center'>Search</p>
                        </button>
                    </div> */}
                </Form>

            </div>
        </>
    );
};

export default Sidebar;