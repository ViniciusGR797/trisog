import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Authentication from "@/components/sections/Authentication";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login - Trisog</title>
        <meta name="description" content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Authentication />
      </main>
    </>
  );
}
