import React from 'react';
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const FrontPagination = ({ page, total, limit, totalPages, onPageChange, onSizeChange }) => {
    const theme = 'primary';
    return (
        <div className="flex flex-wrap justify-between mb-2">


            <ReactPaginate
                breakLabel="..."
                previousLabel={<FiChevronLeft />}
                disabledLinkClassName="text-gray-300"
                previousLinkClassName={`text-sm border border-primary hover:bg-primary hover:text-white text--primary font-semibold h-10 flex items-center justify-center w-10 rounded-l`}
                nextLinkClassName={`text-sm border border-primary hover:bg-primary hover:text-white text-primary font-semibold h-10 flex items-center justify-center w-10 rounded-r`}
                pageLinkClassName={`text-sm border border-primary mx-1 hover:bg-primary hover:text-white text-primary font-semibold h-10 w-10 flex justify-center items-center`}
                pageClassName="!mb-3 md:!mb-0"
                activeLinkClassName={`bg-primary !text-white`}
                nextLabel={<FiChevronRight />}
                className="flex flex-wrap"
                onPageChange={({ selected }) => onPageChange(selected + 1)}
                pageRangeDisplayed={3}
                pageCount={totalPages || 1}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default FrontPagination;