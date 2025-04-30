import React from 'react'
import MainLayout from '@/components/layout/MainLayout';
import Gallery from '@/components/product/gallery/Gallery';
import Title from "@/components/Title/Title";
import Footer from "@/components/common/footer/Footer";

function places() {
  return (
    <div>
      <MainLayout />
     
      <Gallery Gallerylimits={1000} />
      <Footer />
    </div>
  )
}

export default places