import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/common/SearchBar";

interface PageHeaderProps {
  imageSrc: string;
  title: string;
  pathPrefix: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  imageSrc,
  title,
  pathPrefix,
}) => {
  const createSlug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");
  const pathParts = pathPrefix.split(" / ").filter(Boolean);

  const pathLinks = pathParts.map((part, index) => {
    const slug = createSlug(part);
    const href = "/" + slug;

    return (
      <span key={index}>
        <Link
          href={
            pathParts.length > 0 &&
            pathParts[pathParts.length - 1] === part &&
            slug !== "home"
              ? href + "s"
              : href
          }
        >
          {part}
        </Link>{" "}
        /{" "}
      </span>
    );
  });

  const finalPath =
    pathParts.length > 1
      ? pathParts
          .slice(1)
          .map((part, index) => {
            const slug = createSlug(part);
            return index === pathParts.length - 2 ? `${slug}s` : slug;
          })
          .join("/") +
        "/" +
        createSlug(title)
      : createSlug(title.split(" ")[0] + "s");

  return (
    <section className={styles.pageHeader}>
      <Image
        src={imageSrc}
        alt={title}
        fill={true}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{title}</h1>
        <p className={`${styles.path} ${styles.listItems}`}>
          {pathLinks}
          <span>
            <Link href={`/${finalPath}`} className={styles.finalPath}>
              {title}
            </Link>
          </span>
        </p>
      </div>
      <SearchBar />
    </section>
  );
};

export default PageHeader;
