import React from 'react'
import Review from '@/components/review/Review'
import Navbar from '@/components/common/header/Navbar'
import Footer from '@/components/common/footer/Footer'

const page = () => {
    return (
        <div>
            <Navbar />
            <Review />
            <Footer />
        </div>
    )
}

export default page