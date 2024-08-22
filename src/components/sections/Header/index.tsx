import React from "react";
import { FaTwitter, FaLinkedin, FaGoogle, FaPinterestP } from "react-icons/fa";
import { GoSearch, GoPerson } from "react-icons/go";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.contact}>
        <div className={styles.contactLeft}>
          <p>(000) 999-898-999</p>
          <span>|</span>
          <p>info@trisog.com</p>
        </div>
        <div className={styles.contactRight}>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className={styles.iconSocialMedia} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className={styles.iconSocialMedia} />
          </a>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer">
            <FaGoogle className={styles.iconSocialMedia} />
          </a>
          <a href="https://pinterest.com/" target="_blank" rel="noopener noreferrer">
            <FaPinterestP className={styles.iconSocialMedia} />
          </a>
          <span>|</span>
          <select className={styles.currencySelect}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
          </select>
        </div>
      </div>

      <div className={styles.menu}>
        <Link href="/home">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={35}
            className={styles.logo}
          />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.menuBar}>
            <li className={router.pathname === "/home" ? styles.active : ""}>
              <Link href="/home">Home</Link>
            </li>
            <li className={router.pathname === "/about" ? styles.active : ""}>
              <Link href="/about">About</Link>
            </li>
            <li className={router.pathname === "/tuors" ? styles.active : ""}>
              <Link href="/tuors">Tours</Link>
            </li>
            <li
              className={
                router.pathname === "/destination" ? styles.active : ""
              }
            >
              <Link href="/destination">Destination</Link>
            </li>
            <li className={router.pathname === "/blog" ? styles.active : ""}>
              <Link href="/blog">Blog</Link>
            </li>
            <li className={router.pathname === "/pages" ? styles.active : ""}>
              <Link href="/pages">Pages</Link>
            </li>
            <li className={router.pathname === "/contact" ? styles.active : ""}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.rightIcons}>
          <GoSearch className={styles.iconMenu} />
          <Link href="/" className={styles.loginSignup}>
            <GoPerson className={styles.iconMenu} />
            <span>Login / SignUp</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
