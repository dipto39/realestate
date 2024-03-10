import React from 'react'

function Mapp() {
  return (
    <section className='py-10'>
      <div className="container mx-auto">
        <div className="w-full h-full">
          {/* <iframe src={jsonData?.map} height="400" width="1320" title="Iframe Example"></iframe> */}
          <img className='h-full w-full object-cover' src="./map.png" alt="map" />
        </div>
      </div>
    </section>
  )
}

export default Mapp