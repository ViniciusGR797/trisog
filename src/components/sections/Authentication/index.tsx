import React from 'react';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { logInWithFacebook, logInWithGithub, logInWithGoogle } from '@/services/firebase/userService';

interface AuthenticationProps {
  title: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  buttonText: string;
  bottomText: string;
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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

//   const handleSignUp = async () => {
//     const { user, error: firebaseError } = await signUpWithEmail(email, password);
//     if (firebaseError || !user) {
//       toast.warn(firebaseError);
//       return;
//     }
//   };
  
  const handleGoogleLogIn = async () => {
    const { user, error: firebaseError } = await logInWithGoogle();
    if (firebaseError || !user) {
      toast.warn(firebaseError);
      return;
    }
  };
  
  const handleFacebookLogIn = async () => {
    const { user, error: firebaseError } = await logInWithFacebook();
    if (firebaseError || !user) {
      toast.warn(firebaseError);
      return;
    }
  };

  const handleGithubLogIn = async () => {
    const { user, error: firebaseError } = await logInWithGithub();
    if (firebaseError || !user) {
      toast.warn(firebaseError);
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <section className={styles.authentication}>
      <div className={styles.content}>
        <img src={imageUrl} alt="Authentication Visual" className={styles.image} />
        <div className={styles.formContainer}>
          <div className={styles.logo}>Logo</div>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.socialLogin}>
            <button onClick={handleGoogleLogIn}>Login with Google</button>
            <button onClick={handleFacebookLogIn}>Login with Facebook</button>
            <button onClick={handleGithubLogIn}>Login with GitHub</button>
          </div>
          <div className={styles.orDivider}>Or</div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder={emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && !email && <span className={styles.error}>Email is required</span>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder={passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && !password && <span className={styles.error}>Password is required</span>}
            </div>
            <button type="submit" className={styles.submitButton}>
              {buttonText}
            </button>
          </form>
          <div className={styles.bottomText}>
            {bottomText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authentication;
