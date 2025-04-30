import MainLayout from '../../../components/layout/MainLayout'
import React from 'react'
import About from '@/components/about/About'
import Footer from "@/components/common/footer/Footer";
import Script from 'next/script';


function about() {
  return (
    <div>
      <MainLayout />

      <About />
      <Footer />
      <Script
        src={`/js/gt.min.js?v=${new Date().getTime()}`} // Unique query param
        strategy="afterInteractive"
      />
    </div>
  )
}

export default about