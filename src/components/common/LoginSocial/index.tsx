import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";

interface LoginSocialProps {
  imageUrl: string;
  text: string;
  onClick: () => void;
}

const LoginSocial: React.FC<LoginSocialProps> = ({
  imageUrl,
  text,
  onClick,
}) => {
  return (
    <div className={styles.loginSocial} onClick={onClick}>
      <Image
        src={imageUrl}
        alt={text}
        width={25}
        height={25}
        className={styles.icon}
      />
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default LoginSocial;
