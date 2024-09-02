import React from 'react';
import styles from '../style/footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
      <div className={styles.footerLogo}><h1>FASCO</h1></div>
        <div className={styles.links}>
          <a href="/support-center">Support Center</a>
          <a href="/invoicing">Invoicing</a>
          <a href="/contract">Contract</a>
          <a href="/blog">Blog</a>
          <a href="/faqs">FAQs</a>
        </div>
      </div>
      <div className={styles.copyright}>
        Copyright © 2024 Xpro. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
