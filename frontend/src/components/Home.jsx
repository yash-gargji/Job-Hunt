import React from 'react'
import Navbar from './shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import CategoryCarousel from './CategoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './shared/Footer.jsx'

function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobs/>
    <Footer/>
    </>
    
  )
}

export default Home