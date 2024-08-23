import React from "react";
import { FaFacebookSquare, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { PiPaperPlaneTilt } from "react-icons/pi";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <RevealWrapper
        origin="bottom"
        delay={200}
        duration={1000}
        className={styles.footerContainer}
      >
        <div className={styles.contact}>
          <Link href="/home">
            <Image
              src="/logo-light.svg"
              alt="Logo"
              width={120}
              height={35}
              priority={true}
              className={styles.logo}
            />
          </Link>
          <div className={styles.contactInfo}>
            <p className={styles.needHelp}>Need any help?</p>
            <p className={styles.phoneNumber}>
              Call Us: <span>(888) 1234 5678</span>
            </p>
          </div>

          <div className={styles.contactInfo}>
            <p>Love Street, Muscat, Oman</p>
            <p>example@trisog.com</p>
          </div>

          <div className={styles.socialMedia}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare className={styles.iconSocialMedia} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className={styles.iconSocialMedia} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className={styles.iconSocialMedia} />
            </a>
          </div>
        </div>

        <div className={styles.line}></div>

        <div className={styles.links}>
          <div className={styles.company}>
            <h4 className={styles.title}>Company</h4>
            <ul className={styles.listItems}>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/blog">Travel Guides</Link>
              </li>
              <li>
                <Link href="/blog">Data Policy</Link>
              </li>
            </ul>
          </div>

          <div className={styles.destinations}>
            <h4 className={styles.title}>Top Destinations</h4>

            <div className={styles.column}>
              <ul className={styles.listItems}>
                <li>
                  <Link href="/tours/las-vegas">Las Vegas</Link>
                </li>
                <li>
                  <Link href="/tours/new-york-city">New York City</Link>
                </li>
                <li>
                  <Link href="/tours/san-francisco">San Francisco</Link>
                </li>
                <li>
                  <Link href="/tours/hawaii">Hawaii</Link>
                </li>
              </ul>

              <ul className={styles.listItems}>
                <li>
                  <Link href="/tours/tokyo">Tokyo</Link>
                </li>
                <li>
                  <Link href="/tours/sydney">sydney</Link>
                </li>
                <li>
                  <Link href="/tours/melbourne">Melbourne</Link>
                </li>
                <li>
                  <Link href="/tours/dubai">Dubai</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.line}></div>

        <div className={styles.newsletter}>
          <label htmlFor="newsletter" className={styles.label}>
            Sign up Newsletter
          </label>
          <div className={styles.input}>
            <PiPaperPlaneTilt className={styles.iconInput} />
            <input
              type="email"
              id="newsletter"
              placeholder="Enter email..."
            />
          </div>
          <button type="button">Submit</button>
          <p>&copy; 2023 Trisog All Right Reserved</p>
        </div>
      </RevealWrapper>
    </footer>
  );
};

export default Footer;
