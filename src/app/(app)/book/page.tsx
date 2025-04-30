import React from 'react';

import TourBookingForm from '@/components/TourBook/TourBookingForm';
import MainLayout from '@/components/layout/MainLayout'
import Footer from '@/components/common/footer/Footer'

const Book = () => {

    return( <div>
        
        <TourBookingForm />
        <MainLayout />
        <Footer />
        </div>
    )
}

export default Book