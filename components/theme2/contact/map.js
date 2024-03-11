import React from 'react'

function Mapp({about}) {

  const jsonData = JSON.parse(about?.content || '{}')
  console.log("🚀 ~ Mapp ~ jsonData:", jsonData)

  return (
    <section className='pb-10 md:pb-20'>
      <div className="container mx-auto">
        <div className="w-full h-full">
          <iframe src={jsonData?.map} className='h-[300px] md:h-[500px]' width="100%" title="Iframe Example"></iframe>
          {/* <img className='h-full w-full object-cover' src="./map.png" alt="map" /> */}
        </div>
      </div>
    </section>
  )
}

export default Mapp