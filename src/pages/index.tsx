import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Authentication from "@/components/sections/Authentication";
import { toast } from "react-toastify";
import { logInWithEmail } from "@/services/firebase/userService";

export default function Home() {
  const handleLogIn = async (email: string, password: string) => {
    const { user, error: firebaseError } = await logInWithEmail(email, password);
    if (firebaseError || !user) {
      toast.warn(firebaseError);
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Login - Trisog</title>
        <meta name="description" content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <Authentication
        title="Welcome back"
        emailPlaceholder="Enter your email"
        passwordPlaceholder="Enter your password"
        buttonText="Sign In"
        bottomText="Don't have an account? Sign Up"
        imageUrl="/images/login.svg"
        onSubmit={handleLogIn}
      />
      </main>
    </>
  );
}
