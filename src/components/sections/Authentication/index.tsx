import React, { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  logInWithFacebook,
  logInWithGithub,
  logInWithGoogle,
} from "@/services/firebase/userService";
import InputAuth from "@/components/common/InputAuth";
import LoginSocial from "@/components/common/LoginSocial";
import { RevealWrapper } from "next-reveal";

interface AuthenticationProps {
  title: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  buttonText: string;
  bottomText: ReactNode;
  imageUrl: string;
  onSubmit: (email: string, password: string) => void;
}

const Authentication: React.FC<AuthenticationProps> = ({
  title,
  emailPlaceholder,
  passwordPlaceholder,
  buttonText,
  bottomText,
  imageUrl,
  onSubmit,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateField = (name: string, value: string): string => {
    let error = "";

    switch (name) {
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email";
        break;
      case "password":
        if (
          !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            value
          )
        )
          error =
            "Password must be 8+ chars, with upper, lower, number, and special";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData.email, formData.password);
  };

  const handleGoogleLogIn = async () => {
    const { user, error: firebaseError } = await logInWithGoogle();
    if (firebaseError || !user) {
      toast.warn(firebaseError);
      return;
    }
    toast.success(`Welcome, ${user.displayName?.split(" ")[0]}!`);
    router.push("/home");
  };

  const handleFacebookLogIn = async () => {
    const { user, error: firebaseError } = await logInWithFacebook();
    if (firebaseError || !user) {
      toast.warn(firebaseError);
      return;
    }
    toast.success(`Welcome, ${user.displayName?.split(" ")[0]}!`);
    router.push("/home");
  };

  const handleGithubLogIn = async () => {
    const { user, error: firebaseError } = await logInWithGithub();
    if (firebaseError || !user) {
      toast.warn(firebaseError);
      return;
    }
    toast.success(`Welcome, ${user.displayName?.split(" ")[0]}!`);
    router.push("/home");
  };

  return (
    <section className={styles.authentication}>
      <RevealWrapper
        origin="left"
        delay={200}
        duration={1000}
        className={styles.formContainer}
      >
        <Link href="/home">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={35}
            className={styles.logo}
          />
        </Link>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.socialLogin}>
          <LoginSocial
            imageUrl="/icons/google.svg"
            text="Google"
            onClick={handleGoogleLogIn}
          />
          <LoginSocial
            imageUrl="/icons/facebook.svg"
            text="Facebook"
            onClick={handleFacebookLogIn}
          />
          <LoginSocial
            imageUrl="/icons/github.svg"
            text="GitHub"
            onClick={handleGithubLogIn}
          />
        </div>
        <div className={styles.orDivider}>Or</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputAuth
            label="Email *"
            type="text"
            name="email"
            value={formData.email}
            placeholder={emailPlaceholder}
            onChange={handleChange}
            error={errors.email}
          />
          <InputAuth
            label="Password *"
            type="password"
            name="password"
            value={formData.password}
            placeholder={passwordPlaceholder}
            onChange={handleChange}
            error={errors.password}
          />
          <button type="submit" className={styles.submitButton}>
            {buttonText}
          </button>
        </form>
        <div className={styles.bottomText}>{bottomText}</div>
      </RevealWrapper>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt="Authentication Visual"
          fill={true}
          style={{ objectFit: "cover" }}
          priority={true}
          placeholder="blur"
          blurDataURL={imageUrl}
        />
      </div>
    </section>
  );
};

export default Authentication;
