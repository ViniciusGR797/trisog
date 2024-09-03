import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/common/SearchBar";

interface PageHeaderProps {
  imageSrc: string;
  title: string;
  pathPrefix: string;
  pathSuffix: string;
  showSearchBar?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  imageSrc,
  title,
  pathPrefix,
  pathSuffix,
  showSearchBar = true,
}) => {
  const createSlug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");
  const pathParts = pathPrefix.split(" / ").filter(Boolean);

  const pathLinks = pathParts.map((part, index) => {
    const slug = createSlug(part);
    const href = part === "Home" ? "/" + slug : "/" + slug + "s";

    return (
      <span key={index}>
        <Link href={href}>{part}</Link> /{" "}
      </span>
    );
  });

  return (
    <section className={styles.pageHeader}>
      <Image
        src={imageSrc}
        alt={title}
        fill={true}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <div className={styles.gradient}/>
      <div className={`${styles.textContainer} ${!showSearchBar ? styles.noSearchBar  : ""}`}>
        <h1 className={styles.title}>{title}</h1>
        <p className={`${styles.path} ${styles.listItems}`}>
          {pathLinks}
          <span>
            <Link href={`/${pathSuffix}`} className={styles.finalPath}>
              {title}
            </Link>
          </span>
        </p>
      </div>
      {showSearchBar && <SearchBar />}
    </section>
  );
};

export default PageHeader;
