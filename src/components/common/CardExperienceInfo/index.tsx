import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Experience } from "@/types/experience";
import { useFavoriteContext } from "@/contexts/FavoriteContext";
import { toast } from "react-toastify";
import ExperienceService from "@/services/api/experienceService";
import FavoriteService from "@/services/api/favoriteService";
import { LuMapPin } from "react-icons/lu";
import { GrShareOption } from "react-icons/gr";
import ExperienceItemDetails from "../ExperienceItemDetails";
import { FiVideo } from "react-icons/fi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { parseCookies } from "nookies";
import { formatDuration } from "@/utils/time";
import { useRouter } from "next/router";
import { calculateAverageRating } from "@/utils/average";

interface CardExperienceProps {
  experience: Experience;
}

const CardExperienceInfo: React.FC<CardExperienceProps> = ({ experience }) => {
  const router = useRouter();
  const { symbol, exchangeRate } = useCurrency();
  const { favorites, setFavorites } = useFavoriteContext();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const onFavoriteToggle = async (id: string) => {
    const cookies = parseCookies();
    const userCookie = cookies["@auth.user"]
      ? JSON.parse(cookies["@auth.user"])
      : null;

    if (userCookie === null) {
      toast.warning("You need to be logged in to add to favorites");
      return;
    }

    const isFavorite = favoriteIds.has(id);

    let response;
    if (isFavorite) {
      response = await FavoriteService.deleteFavorite(id);
      if (response.status === 200) {
        setFavorites(
          favorites.filter((favorite) => favorite.experience_id !== id)
        );
        setFavoriteIds((prevIds) => {
          const updatedIds = new Set(prevIds);
          updatedIds.delete(id);
          return updatedIds;
        });
        toast.success("Removed from favorites");
      }
    } else {
      response = await FavoriteService.createFavorite(id);
      if (response.status === 201) {
        const newFavorite = response.data;
        setFavorites([...favorites, newFavorite]);
        setFavoriteIds((prevIds) => {
          const updatedIds = new Set(prevIds);
          updatedIds.add(id);
          return updatedIds;
        });
        toast.success("Added to favorites");
      }
    }
  };

  const fetchDataFavorites = async () => {
    const response = await FavoriteService.getFavorite();
    if (response?.status === 200) {
      setFavorites(response.data);
      const ids: Set<string> = new Set(
        response.data.map((fav: { experience_id: string }) => fav.experience_id)
      );
      setFavoriteIds(ids);
    }
  };

  useEffect(() => {
    fetchDataFavorites();
  }, [router]);

  const handleButtonCopyLinkClick = (): void => {
    if (typeof window === "undefined") return;

    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const completeURL = `${baseURL}${router.asPath}`;

    console.log(completeURL);

    if (!navigator.clipboard) {
      toast.warning("The browser does not support copy link");
      return;
    }

    navigator.clipboard
      .writeText(completeURL)
      .then(() => {
        toast.success("Copy Link");
      })
      .catch((err) => {
        toast.error("Copying Error");
      });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={experience.image}
          alt={experience.title}
          width={1000}
          height={1000}
          priority={true}
          className={styles.image}
        />
        <div className={styles.links}>
          <a
            href={experience.video}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span>Video</span>
            <FiVideo className={styles.linkIcon} />
          </a>
          <a
            href={experience.gallery}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span>Gallery</span>
            <MdOutlinePhotoLibrary className={styles.linkIcon} />
          </a>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.headerInfo}>
          <div className={styles.location}>
            <LuMapPin className={styles.mapIcon} />
            {experience.is_activity
              ? `${experience.city}, ${experience.destination?.name}`
              : experience.destination?.name}
            <a
              href={experience.map_link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              View on map
            </a>
          </div>
          <div className={styles.shareFavorite}>
            <GrShareOption
              className={styles.shareFavoriteIcon}
              onClick={() => handleButtonCopyLinkClick()}
            />
            {favoriteIds.has(experience.id) ? (
              <AiFillHeart
                className={styles.shareFavoriteIcon}
                onClick={() => onFavoriteToggle(experience.id)}
              />
            ) : (
              <AiOutlineHeart
                className={styles.shareFavoriteIcon}
                onClick={() => onFavoriteToggle(experience.id)}
              />
            )}
          </div>
        </div>
        <h3 className={styles.name}>{experience.title}</h3>
        <hr className={styles.separator} />
        <div className={styles.detail}>
          <ExperienceItemDetails
            detailTitle="From"
            detailContent={
              <p className={styles.from}>
                {symbol}{" "}
                {parseFloat(
                  (experience.default_price * exchangeRate).toFixed(2)
                ).toString()}
              </p>
            }
            contentClassName={styles.priceContent}
          />
          <ExperienceItemDetails
            detailTitle="Duration"
            detailContent={<>{formatDuration(experience.duration)}</>}
            contentClassName={styles.priceContent}
          />
          <ExperienceItemDetails
            detailTitle="Max People"
            detailContent={<>{experience.max_people}</>}
            contentClassName={styles.priceContent}
          />
          <ExperienceItemDetails
            detailTitle="Min Age"
            detailContent={<>{experience.min_age}+</>}
            contentClassName={styles.priceContent}
          />
          <ExperienceItemDetails
            detailTitle="Tour Type"
            detailContent={
              <>
                {experience?.categories
                  ? experience?.categories
                      .map((category) => category.name)
                      .join(", ")
                  : ""}
              </>
            }
            contentClassName={styles.priceContent}
          />
          <ExperienceItemDetails
            detailTitle="Reviews"
            detailContent={
              <div className={styles.review}>
                <div className={styles.rating}>
                  <AiFillStar className={styles.starIcon} />
                  {calculateAverageRating(experience.ratings)}
                </div>
                <span className={styles.reviewCount}>{`(${
                  experience.review_count
                } ${
                  experience.review_count > 1 ? "reviews" : "review"
                })`}</span>
              </div>
            }
            contentClassName={styles.priceContent}
          />
        </div>
      </div>
    </div>
  );
};

export default CardExperienceInfo;
