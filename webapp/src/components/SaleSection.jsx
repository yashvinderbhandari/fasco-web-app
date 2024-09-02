import React from 'react';
import styles from '../style/salesection.module.css'; 
import leftImage from '../images/leftImage.png';
import rightImage from '../images/rightImage.png';
import topImage from '../images/topImage.png';
import bottomImage from '../images/bottomImage.png';

const SaleSection = () => { 
  return (
    <div className={styles.container}>
      <img src={leftImage} alt="Left" className={styles.leftImage} />
      <div className={styles.middleBlock}>
        <img src={topImage} alt="Top" className={styles.topImage} />
        <div className={styles.textBlock}>
          <h2 className={styles.ultimateSale}>ULTIMATE</h2>
          <h2 className={styles.saleText}>SALE</h2>
          <h3 className={styles.newCollection}>New Collection</h3>
          <button className={styles.shopNowButton}>Shop Now</button>
        </div>
        <img src={bottomImage} alt="Bottom" className={styles.bottomImage} />
      </div>
      <img src={rightImage} alt="Right" className={styles.rightImage} />
    </div>
  );
};

export default SaleSection;
