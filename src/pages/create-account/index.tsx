import Head from "next/head";
import Link from "next/link";
import Authentication from "@/components/sections/Authentication";
import { toast } from "react-toastify";
import { signUpWithEmail } from "@/services/firebase/userService";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleSignUp = async (email: string, password: string) => {
    const { user, error: firebaseError } = await signUpWithEmail(
      email,
      password
    );
    if (firebaseError || !user) {
      toast.warn(firebaseError);
      return;
    }
    toast.success(`Welcome, ${user.email?.split('@')[0]}!`);
    router.push("/home");
  };

  return (
    <>
      <Head>
        <title>CreateAccount - Trisog</title>
        <meta
          name="description"
          content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Authentication
          title="Create account"
          emailPlaceholder="Enter your email"
          passwordPlaceholder="Create a password"
          buttonText="Create account"
          bottomText={
            <>
              Already have an account? <Link href="/">Log In</Link>
            </>
          }
          imageUrl="/images/paradise-beach.svg"
          onSubmit={handleSignUp}
        />
      </main>
    </>
  );
}
