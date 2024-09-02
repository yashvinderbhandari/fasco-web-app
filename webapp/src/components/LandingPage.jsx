import React from 'react'
 import LandingNavbar from './LandingNavbar';
 import SaleSection from './SaleSection';
 import Brands from './Brands';
 import NewArrivals from './NewArrivals';
import Photos from './Photos';
import Footer from './Footer';
function LandingPage() {
    return (
         <div>
    <LandingNavbar></LandingNavbar>
    <SaleSection></SaleSection>
    <Brands></Brands>
    <NewArrivals></NewArrivals>
    <Photos></Photos>
    <Footer></Footer>
         </div>
    )
}

export default LandingPage;
