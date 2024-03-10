import React from 'react'

const SingelBtn = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={`px-[30px] py-3 rounded text-black hover:text-white header_5 transition-all hover:bg-primary bg-primary_lite ${className}`}>
        {children}
    </button>
  )
}

export default SingelBtn