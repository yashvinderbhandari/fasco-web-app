import React from 'react';
import styles from '../style/brands.module.css'; 

function Brands() {
    return (
        <div className={styles.brandsContainer}>
            <h2 className={styles.chanel}>CHANEL</h2>
            <h2 className={styles.louisVuitton}>LOUIS VUITTON</h2>
            <h2 className={styles.prada}>PRADA</h2>
            <h2 className={styles.calvinKlein}>Calvin Klein</h2>
            <h2 className={styles.denim}>DENIM</h2>
        </div>
    );
}

export default Brands;
