import React, { useState } from 'react';
import styles from './header.module.css';
import { Link } from 'react-scroll';
import { useNavigate } from "react-router-dom"; // Import useNavigate for page redirection



const Header = () => {
    const [activeMenu, setActiveMenu] = useState("");
    const navigate = useNavigate(); // Initialize navigation function


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_KKdk3aUCg-HctWX1TIfafQHI3WhscdST3A&s" alt="Logo" />
                <p>Farmnetic</p>
            </div>

            <nav className={styles.nav}>
                <Link to="dashboard" smooth={true} duration={500} onClick={() => setActiveMenu("home")} className={activeMenu === "home" ? `${styles.link} ${styles.active}` : styles.link}>
                    Home
                </Link>
                <Link to="analytics" smooth={true} duration={500} onClick={() => setActiveMenu("analytics")} className={activeMenu === "analytics" ? `${styles.link} ${styles.active}` : styles.link}>
                    Analytics
                </Link>
                <Link to="detect" smooth={true} duration={500} onClick={() => setActiveMenu("detect")} className={activeMenu === "detect" ? `${styles.link} ${styles.active}` : styles.link}>
                    Detect
                </Link>
                <span
          onClick={() => navigate("/common-diseases")}
          className={activeMenu === "common-plant-disease" ? `${styles.link} ${styles.active}` : styles.link}
          style={{ cursor: "pointer" }}
        >
          Common Plant Disease
        </span>
                <Link to="contact" smooth={true} duration={500} onClick={() => setActiveMenu("contact")} className={activeMenu === "contact" ? `${styles.link} ${styles.active}` : styles.link}>
                    Contact
                </Link>
            </nav>

            <div className={styles.actions}>
                <Link to="/login" className={styles.login}>Login</Link>
                <Link to="/signup"><button className={styles.signIn}>Sign In</button></Link>
            </div>
        </header>
    );
};

export default Header;
