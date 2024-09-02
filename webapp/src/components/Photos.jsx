import React from 'react';
import styles from '../style/photos.module.css';
import LImage from '../images/LImage.png';
import RImage from '../images/RImage.png';
import BImage from '../images/BImage.png';
import BOImage from '../images/BOImage.png';
import BottImage from '../images/BottImage.png';

function Photos() {
    return (
        <div className={styles.photosContainer}>
            <div className={styles.horizontalImages}>
                <img src={LImage} alt="Image 1" className={styles.LImage} />
                <img src={RImage} alt="Image 2" className={styles.RImage} />
            </div>
            <div className={styles.verticalImages}>
                <img src={BImage} alt="Image 3" className={styles.BImage} />
                <img src={BOImage} alt="Image 4" className={styles.BOImage} />
                <img src={BottImage} alt="Image 5" className={styles.BottImage} />
            </div>
        </div>
    );
}

export default Photos;
