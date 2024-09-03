import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaGoogle,
  FaPinterestP,
} from "react-icons/fa";
import { GoSearch, GoPerson } from "react-icons/go";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useCurrency } from "@/contexts/CurrencyContext";
import { destroyCookie, parseCookies } from "nookies";
import { set } from "date-fns";
import { FiSearch } from "react-icons/fi";
import { useExperienceContext } from "@/contexts/ExperienceContext";
import { useQueryContext } from "@/contexts/QueryOptionsContext";
import { QueryOption } from "@/types/queryOption";
import ExperienceService from "@/services/api/experienceService";

interface User {
  firstName: string;
  email: string;
  photoUrl: string;
}

const Header: React.FC = () => {
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();
  const { state, dispatch } = useQueryContext();
  const [user, setUser] = useState<User | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { setExperiences, setLoading } = useExperienceContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value as "USD" | "EUR" | "BRL");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleFavorites = () => {
    router.push("/favorites");
  };

  const handleBookings = () => {
    router.push("/bookings");
  };

  const handleLogout = () => {
    destroyCookie(null, "@auth.user", {
      path: "/",
    });
    router.push("/");
  };

  const fetchDataExperiences = async (queryOption: QueryOption) => {
    setLoading(true);
    const response = await ExperienceService.getExperiences(queryOption);
    if (response?.status === 200) {
      setExperiences(response.data);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    dispatch({ type: "SET_TITLE", payload: searchTerm });
    state.title = searchTerm;
    fetchDataExperiences(state);
    router.push("/tours");
  };

  useEffect(() => {
    const cookies = parseCookies();
    const userCookie = cookies["@auth.user"]
      ? JSON.parse(cookies["@auth.user"])
      : null;
    setUser(userCookie);
  }, [router]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.contact}>
          <div className={styles.contactLeft}>
            <p>(000) 999-898-999</p>
            <span className={styles.separator}>|</span>
            <p>info@trisog.com</p>
          </div>
          <div className={styles.contactRight}>
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
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle className={styles.iconSocialMedia} />
            </a>
            <a
              href="https://pinterest.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPinterestP className={styles.iconSocialMedia} />
            </a>
            <span className={styles.separator}>|</span>
            <select
              className={styles.currencySelect}
              value={currency}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
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
              priority={true}
              className={styles.logo}
            />
          </Link>

          <div className={styles.menuToggle} onClick={toggleMenu}>
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>

          <nav className={`${styles.nav} ${menuOpen ? styles.menuOpen : ""}`}>
            <ul className={styles.menuBar}>
              <li className={router.pathname === "/home" ? styles.active : ""}>
                <Link href="/home">Home</Link>
              </li>
              <li className={router.pathname === "/about" ? styles.active : ""}>
                <Link href="/about">About</Link>
              </li>
              <li className={router.pathname === "/tours" ? styles.active : ""}>
                <Link href="/tours">Tours</Link>
              </li>
              <li
                className={
                  router.pathname === "/destinations" ? styles.active : ""
                }
              >
                <Link href="/destinations">Destination</Link>
              </li>
              <li className={router.pathname === "/blog" ? styles.active : ""}>
                <Link href="/blog">Blog</Link>
              </li>
              <li className={router.pathname === "/pages" ? styles.active : ""}>
                <Link href="/pages">Pages</Link>
              </li>
              <li
                className={router.pathname === "/contact" ? styles.active : ""}
              >
                <Link href="/contact">Contact</Link>
              </li>
            </ul>

            <div className={styles.rightIcons}>
              <div className={styles.searchIcon}>
                <GoSearch className={styles.iconMenu} onClick={handleSearch}/>
                {searchOpen && (
                  <div className={styles.inputWrapper}>
                    <input
                      id="searchFilter"
                      type="text"
                      name="searchFilter"
                      value={searchTerm}
                      placeholder="Type anything..."
                      onChange={handleSearchChange}
                      className={styles.input}
                    />
                    <FiSearch
                      title="Clique para buscar"
                      onClick={handleSearchClick}
                      className={styles.icon}
                    />
                  </div>
                )}
              </div>

              {user ? (
                <div
                  className={styles.userProfile}
                  onClick={() => setShowLogout(!showLogout)}
                >
                  <Image
                    src={user.photoUrl ? user.photoUrl : "/images/user.svg"}
                    alt={
                      user.firstName
                        ? user.firstName
                        : user.email?.split("@")[0]
                    }
                    width={35}
                    height={35}
                    className={styles.userPhoto}
                  />
                  <span>
                    {user.firstName
                      ? user.firstName
                      : user.email?.split("@")[0]}
                  </span>
                  {showLogout && (
                    <div className={styles.dropdown}>
                      <div
                        className={styles.dropdownItem}
                        onMouseDown={() => handleFavorites()}
                      >
                        Favorites
                      </div>
                      <div
                        className={styles.dropdownItem}
                        onMouseDown={() => handleBookings()}
                      >
                        Bookings
                      </div>
                      <div
                        className={styles.dropdownItem}
                        onMouseDown={() => handleLogout()}
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/" className={styles.loginSignup}>
                  <GoPerson className={styles.iconMenu} />
                  <span>Login / SignUp</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
      {menuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
};

export default Header;
