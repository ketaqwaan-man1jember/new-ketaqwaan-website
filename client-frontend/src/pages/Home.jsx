import React, { useEffect } from 'react'
import HeroSection from '../components/sections/HeroSection'
import StructureSection from '../components/sections/StructureSection'
import ProgramKerjaSection from '../components/sections/ProgramKerjaSection'
import KegiatanSection from '../components/sections/KegiatanSection'
import EkskulSection from '../components/sections/EkskulSection'
import InformasiSection from '../components/sections/InformasiSection'
import SaranSection from '../components/sections/SaranSection'

const Home = () => {
  useEffect(() => {
    // Initialize AOS if needed
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      })
    }
  }, [])

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StructureSection />
      <ProgramKerjaSection />
      <KegiatanSection />
      <EkskulSection />
      <InformasiSection />
      <SaranSection />
    </div>
  )
}

export default Home