
import React from 'react'
import Blog from '@/components/blog/Blog';
import Navbar from '@/components/common/header/Navbar';
import Footer from '@/components/common/footer/Footer';

const page = () => {
  return (
    <div>
    
      <Navbar />
      <Blog />
      <Footer />
      
    </div>
  )
}

export default page;