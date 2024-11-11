import React from "react";
import styles from "./header.module.scss";
import bombLogo from "../../img/bomb-logo.png";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <h1 onClick={handleLogoClick} className={styles.header__title}>
        <span className={styles.header__logo}>Boom</span>
        <img className={styles.header__image} src={bombLogo} alt="logo" />
        box
      </h1>
    </header>
  );
};
