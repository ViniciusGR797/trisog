import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Rating from "@/components/common/Rating";
import Checkbox from "@/components/common/Checkbox";
import { toast } from "react-toastify";
import ReviewService from "@/services/api/reviewService";
import router from "next/router";
import { parseCookies } from "nookies";
import { Ratings } from "@/types/review";
import { Experience } from "@/types/experience";

interface ReviewFormProps {
  experience: Experience | undefined;
  onChange: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ experience, onChange }) => {
  const [formData, setFormData] = useState({
    services: 0,
    location: 0,
    amenities: 0,
    prices: 0,
    food: 0,
    room_comfort_and_quality: 0,
    name: "",
    email: "",
    comment: "",
    image: "/images/user.svg"
  });
  const [userCookie, setUserCookie] = useState({
    token: "",
    firstName: "",
    email: "",
    photoUrl: "",
  });
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleChange = (newValue: number, name: string) => {
    setFormData({ ...formData, [name]: newValue });
  };

  const handleClick = async () => {
    let {
      services,
      location,
      amenities,
      prices,
      food,
      room_comfort_and_quality,
      name,
      email,
      comment,
      image
    } = formData;

    if (experience === undefined || experience.id === "" || experience.id === undefined) {
      toast.warn("Experience not found");
      return;
    }
    if (services === 0) {
      toast.warn("Please rate the services");
      return;
    }
    if (location === 0) {
      toast.warn("Please rate the location");
      return;
    }
    if (amenities === 0) {
      toast.warn("Please rate the amenities");
      return;
    }
    if (prices === 0) {
      toast.warn("Please rate the prices");
      return;
    }
    if (food === 0) {
      toast.warn("Please rate the food");
      return;
    }
    if (room_comfort_and_quality === 0) {
      toast.warn("Please rate the room comfort and quality");
      return;
    }
    if (isAnonymous && name === "") {
      toast.warn("Please enter your name");
      return;
    }
    if (isAnonymous && email === "") {
      toast.warn("Please enter your email");
      return;
    }
    if (isAnonymous && !/^\S+@\S+\.\S+$/.test(email)) {
      toast.warn("Please enter a valid email");
      return;
    }
    if (comment === "") {
      toast.warn("Please write a comment");
      return;
    }

    if(!isAnonymous) {
      email = userCookie.email || "";
      name = userCookie.firstName || "";
      image = userCookie.photoUrl || "/images/user.svg";
    }

    const ratings: Ratings = {
      services,
      location,
      amenities,
      prices,
      food,
      room_comfort_and_quality
    };

    const response = await ReviewService.createReview(
      name,
      email,
      comment,
      image,
      ratings,
      experience.id
    );
    if (response?.status === 201) {
      toast.success("Review successful!");
      setFormData({
        services: 0,
        location: 0,
        amenities: 0,
        prices: 0,
        food: 0,
        room_comfort_and_quality: 0,
        name: "",
        email: "",
        comment: "",
        image: "/images/user.svg"
      });
      onChange();
    } else {
      toast.warning("Review failed. Please try again.");
    }
  };

  useEffect(() => {
    const cookies = parseCookies();
    const userCookie = cookies['@auth.user'] ? JSON.parse(cookies['@auth.user']) : null;
    setUserCookie(userCookie);
  }, [router]);

  return (
    <section className={styles.reviewForm}>
      <div className={styles.reviewContainer}>
        <div className={styles.container}>
          <p className={styles.title}>Add a review</p>
          <div className={styles.ratings}>
            <Rating
              criterion="services"
              label="Services"
              value={formData.services}
              onChange={handleChange}
            />
            <Rating
              criterion="location"
              label="Locations"
              value={formData.location}
              onChange={handleChange}
            />
            <Rating
              criterion="amenities"
              label="Amenities"
              value={formData.amenities}
              onChange={handleChange}
            />
            <Rating
              criterion="prices"
              label="Prices"
              value={formData.prices}
              onChange={handleChange}
            />
            <Rating
              criterion="food"
              label="Food"
              value={formData.food}
              onChange={handleChange}
            />
            <Rating
              criterion="room_comfort_and_quality"
              label="Room comfort and quality"
              value={formData.room_comfort_and_quality}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form}>
            {isAnonymous && (
              <div className={styles.inputs}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Your name"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email address"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={styles.input}
                />
              </div>
            )}
            <textarea
              name="comment"
              value={formData.comment}
              placeholder="Write your comment"
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className={`${styles.input} ${styles.textarea}`}
            />
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.button}
                onClick={handleClick}
              >
                Submit review
              </button>
              <div className={styles.anonymous}>
                <label htmlFor="anonymous" className={styles.label}>
                  Anonymous
                </label>
                <Checkbox
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewForm;
