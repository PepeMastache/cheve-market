// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <FeaturedProducts />
      <Footer />
    </>
  );
}
