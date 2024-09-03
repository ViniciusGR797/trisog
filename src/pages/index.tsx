import Head from "next/head";
import Link from "next/link";
import Authentication from "@/components/sections/Authentication";
import { toast } from "react-toastify";
import { logInWithEmail } from "@/services/firebase/userService";
import { useRouter } from "next/router";
import { use, useEffect } from "react";
import { destroyCookie, parseCookies } from "nookies";

export default function Login() {
  const router = useRouter();
  
  const handleLogIn = async (email: string, password: string) => {
    const { user, error: firebaseError } = await logInWithEmail(
      email,
      password
    );
    if (firebaseError || !user) {
      toast.warn(firebaseError);
      return;
    }
    toast.success(`Welcome, ${user.email?.split('@')[0]}!`)
    router.push('/home');
  };

  useEffect(() => {
    const cookies = parseCookies();
    const loginToast = cookies["loginToast"];
    if (loginToast) {
      toast.warning(loginToast);
      destroyCookie(null, "loginToast", {
        path: "/",
      });
    }    
  }, [router]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Authentication
          title="Welcome back"
          emailPlaceholder="Enter your email"
          passwordPlaceholder="Enter your password"
          buttonText="Sign In"
          bottomText={
            <>
              Don't have an account?{" "}
              <Link href="/create-account">
                Sign Up
              </Link>
            </>
          }
          imageUrl="/images/landscape-woman.svg"
          onSubmit={handleLogIn}
        />
      </main>
    </>
  );
}
