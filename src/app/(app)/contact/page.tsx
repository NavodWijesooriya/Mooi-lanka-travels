import React from 'react'
import MainLayout from '../../../components/layout/MainLayout';
import Contact from '@/components/contact/Contact'
// import { Contact } from 'lucide-react';
import Footer from "@/components/common/footer/Footer";


function contact() {
  return (
    <div>
      <MainLayout />
      <Contact />
      <Footer />
    </div>
  )
}

export default contact