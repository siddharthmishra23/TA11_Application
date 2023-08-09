import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.item}>
          © 2023 Coding Parlour. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
