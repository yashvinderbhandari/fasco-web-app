import React from 'react';
import styles from '../style/landingnavbar.module.css';

const LandingNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}><h1>FASCO</h1></div>
      <div className={styles.navbarLinks}>
        <a href="#home">Home</a>
        <a href="#deals">Deals</a>
        <a href="#new-arrivals">New Arrivals</a>
        <a href="#packages">Packages</a>
      </div>
      <div className={styles.navbarButtons}>
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
