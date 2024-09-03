import React, { useEffect, useState } from "react";
import { FaFacebookSquare, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { PiPaperPlaneTilt } from "react-icons/pi";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { QueryOption } from "@/types/queryOption";
import ExperienceService from "@/services/api/experienceService";
import { initialQueryOption } from "@/contexts/QueryOptionsContext";
import { useExperienceContext } from "@/contexts/ExperienceContext";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { setExperiences, setLoading } = useExperienceContext();

  const fetchDataExperiences = async (queryOption: QueryOption) => {
    setLoading(true);
    const response = await ExperienceService.getExperiences(queryOption);
    if (response?.status === 200) {
      setExperiences(response.data);
    }
    setLoading(false);
  };

  const validateField = (value: string) => {
    return !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email" : "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setEmail(value);

    const error = validateField(value);
    setError(error);
  };

  useEffect(() => {
    setIsFormValid(error === "" && email !== "");
  }, [error, email]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Successfully subscribed! Check your inbox for updates");
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
    }
  };

  const handleClickExperience = (city: string): void => {
    const queryOption = initialQueryOption;
    queryOption.title = city;
    fetchDataExperiences(queryOption);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.contact}>
          <Link href="/home">
            <Image
              src="/logo-light.svg"
              alt="Logo"
              width={120}
              height={35}
              priority={true}
            />
          </Link>
          <div className={`${styles.contactInfo} ${styles.listItems}`}>
            <p className={styles.needHelp}>Need any help?</p>
            <li>
              <a
                href="https://wa.me/88812345678?text=Hello%2C%20I%20am%20reaching%20out%20through%20your%20website%20to%20inquire%20about%20your%20travel%20packages.%20Could%20you%20please%20provide%20more%20information%20about%20the%20services%20you%20offer%20and%20how%20I%20can%20book%20a%20trip%3F%20Thank%20you."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.phoneNumber}
              >
                Call Us: <span>(888) 1234 5678</span>
              </a>
            </li>
          </div>

          <div className={`${styles.contactInfo} ${styles.listItems}`}>
            <li>
              <a
                href="https://www.google.com/maps/place/IN+LOVE+Mall+of+Oman/@23.5713592,58.4019331,17z/data=!4m6!3m5!1s0x3e91ff398e4c9b45:0x7650289911c719f6!8m2!3d23.5713592!4d58.404508!16s%2Fg%2F11tk90lg9z?entry=ttu&g_ep=EgoyMDI0MDgyMC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Love Street, Muscat, Oman
              </a>
            </li>
            <li>
              <a href="mailto:example@trisog.com?subject=Travel%20Inquiry&body=Hello%2C%20I%20am%20contacting%20you%20through%20your%20website%20to%20inquire%20about%20travel%20packages.%20Could%20you%20please%20provide%20more%20details%20about%20your%20services%20and%20how%20I%20can%20book%20a%20trip%3F%20Thank%20you.">
                example@trisog.com
              </a>
            </li>
            <p></p>
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
                  <Link
                    href="/tours"
                    onClick={() => handleClickExperience("Las Vegas")}
                  >
                    Las Vegas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours"
                    onClick={() => handleClickExperience("New York City")}
                  >
                    New York City
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours"
                    onClick={() => handleClickExperience("San Francisco")}
                  >
                    San Francisco
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours"
                    onClick={() => handleClickExperience("Hawaii")}
                  >
                    Hawaii
                  </Link>
                </li>
              </ul>

              <ul className={styles.listItems}>
                <li>
                  <Link
                    href="/tours"
                    onClick={() => handleClickExperience("Tokyo")}
                  >
                    Tokyo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours"
                    onClick={() => handleClickExperience("Sydney")}
                  >
                    Sydney
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours"
                    onClick={() => handleClickExperience("Melbourne")}
                  >
                    Melbourne
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours"
                    onClick={() => handleClickExperience("Dubai")}
                  >
                    Dubai
                  </Link>
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
              value={email}
              onChange={handleChange}
            />
          </div>
          {error && <span className={styles.error}>{error}</span>}
          <button type="button" onClick={handleClick} disabled={!isFormValid}>
            Submit
          </button>
          <p>&copy; 2023 Trisog All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
