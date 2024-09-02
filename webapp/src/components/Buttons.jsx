import React from 'react';
import styles from '../style/buttons.module.css'; 

function Buttons() {
    return (
        <div className={styles.buttonContainer}>
            <button className={styles.customButton}>Men's Fashion</button>
            <button className={styles.customButton}>Women's Fashion</button>
            <button className={styles.customButton}>Women's Accessories</button>
            <button className={styles.customButton}>Men's Accessories</button>
            <button className={styles.customButton}>Discount Deals</button>
        </div>
    );
}

export default Buttons;
