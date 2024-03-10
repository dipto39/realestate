import React from 'react'

const Btn = ({children, className}) => {
  return (
    <button className={`bg-[url('/icons/Vector.png')] bg-no-repeat  bg-center w-[187px] h-[56px] bg-[length:100%_100%] ${className}`} >
        {children}
    </button>
  )
}

export default Btn