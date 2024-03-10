
import { FaEye, FaPencilAlt, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useActionConfirm } from "../../app/helpers/hooks";
import { Loader } from "./loader";
import { LuView } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal } from 'antd';
import { useState } from "react";
import Pagination from "./pagination";
import SearchInput from "../form/search";
import { FiEdit } from "react-icons/fi";

const FrontTable = ({
    columns,
    data,
    indexed,
    loading = false,
    noActions,
    actions,
    action,
    onView,
    onEdit,
    onDelete,
    onReload,
    pagination = false,
    shadow = true,
    title,
    noHeader = false,
    afterSearch,
    onSearchChange,
}) => {


    let cols = noActions ? columns : [...columns, {
        text: 'Action',
        dataField: 'no_actions',
        className: 'w-44 text-right',
        formatter: (noActions, data) => {
            return (
                <div className="flex justify-end gap-2.5">
                    {actions && actions(data)}
                    {onView && (
                        <button className="btn btn-outline-success btn-sm  hover:text-black focus:shadow-none "
                            title="View" onClick={() => onView(data)}>
                            {/* <FaEye /> */}
                            <LuView size={18} />

                        </button>
                    )}
                    {data.disableEdit === 1 && !onView && data.disableDelete === 1 && !actions && '-'}
                    {onEdit && (data?.disableEdit !== 1) && (
                        <button className=" text-indigo-700  hover:text-black focus:shadow-none"
                            title="Edit" onClick={() => onEdit(data)}>
                            {/* <FaPencilAlt size={12} /> */}
                            <FiEdit size={18} />
                        </button>
                    )}
                    {onDelete && (data?.disableDelete !== 1) && (
                        <button className=" text-red-600 hover:text-black focus:shadow-none"
                            title="Delete" onClick={async () => {
                                await useActionConfirm(
                                    onDelete,
                                    { _id: data._id },
                                    onReload, 'Are you sure you want to delete this item?', 'Yes, Delete')
                            }}>
                            {/* <FaTrashAlt size={12} /> */}
                            <RiDeleteBin6Line size={18} />
                        </button>
                    )}
                </div>
            )
        }
    }]



    return (
        <>
            <div className={`w-full bg-white ${shadow ? 'shadow-lg' : ''} rounded-sm mb-4`}>
                {noHeader || (
                    <header className="px-4 pt-3 pb-2 border-b border-gray-100 flex justify-between flex-wrap">
                        {title ? (
                            <>
                                {typeof title === 'string' ?
                                    <h4 className="text-base font-medium text-gray-700">{title}</h4> : title}
                            </>
                        ) : (
                            <div className="flex flex-wrap">
                                <SearchInput className="w-44" onChange={e => {
                                    onReload({ search: e.target.value || undefined, page: 1 })
                                    onSearchChange && onSearchChange(e.target.value || '')
                                }} />
                                {afterSearch}
                            </div>
                        )}
                        {action}
                    </header>
                )}
                <div className=" relative">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase bg-gray-50 text-gray-500">
                                <tr>
                                    {indexed && (
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">#</div>
                                        </th>
                                    )}
                                    {cols?.map((column, index) => (
                                        <th className="p-2 whitespace-nowrap text-left" key={index}>
                                            <div
                                                className={`font-semibold ${column?.className || ''}`}>
                                                {column.text}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">

                                {loading ? (
                                    <tr>
                                        <td className="h-96 pb-16">
                                            <div style={{ height: 200 }} className='absolute w-full flex justify-center'>
                                                <Loader />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                    {/* {
                                        cols?.map((column, index) => (
                                            <div className="h-5 w-full bg-white"></div>
                                        ))
                                    } */}
                                        {(pagination ? data?.docs : data)?.map((row, index) => (
                                            <tr key={index} className={` ${row?.read === true ? '' : 'bg-gray-200'}`}  style={{ borderBottom: '20px solid white' }}>
                                                
                                                {indexed && (
                                                    <td className="p-2 whitespace-nowrap text-gray-500">
                                                        {(pagination ? (data?.page - 1) * data.limit : 0) + index + 1}
                                                    </td>
                                                )}
                                        

                                                {cols?.map((column, index) => (
                                                    <td className={`p-2 whitespace-nowrap text-gray-700 ${column?.className || ''}`}
                                                        key={index}>
                                                        {column.formatter ? column.formatter(row[column.dataField], row) : (row[column.dataField] || '-')}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {pagination && (
                        <div className="p-3 mt-3 border-t">
                            <Pagination
                                page={data?.page} total={data?.totalDocs}
                                onSizeChange={limit => onReload({ limit })} limit={data?.limit}
                                totalPages={data?.totalPages} onPageChange={page => onReload({ page })} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default FrontTable
