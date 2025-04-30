import React from 'react'
import Gallery from '@/components/gallery/Gallery'
import NFlayout from '@/components/nflayout/NFlayout'



const page = () => {
    return (

        <div>
             <NFlayout>
             <Gallery />
            </NFlayout>
        </div>
    )
}

export default page