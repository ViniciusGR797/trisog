import Activities from "@/components/sections/Activities";
import BasicInfo from "@/components/sections/BasicInfo";
import Description from "@/components/sections/Description";
import DestinationInfo from "@/components/sections/DestinationInfo";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import PageHeader from "@/components/sections/PageHeader";
import TourPopular from "@/components/sections/TourPopular";
import DestinationService from "@/services/api/destinationService";
import { Destination } from "@/types/destination";
import { getRandomImage } from "@/utils/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DestinationById() {
  const router = useRouter();
  const { destinationId } = router.query;
  const [destination, setDestination] = useState<Destination>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDataDestinationById = async (destination_id: string) => {
    setLoading(true);
    const response = await DestinationService.getDestinationById(
      destination_id
    );
    if (response?.status === 200) {
      setDestination(response.data);
    } else {
      router.push("/404");
      toast.warning(
        "Oops! The experience you are looking for could not be found"
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (destinationId && typeof destinationId === "string") {
      fetchDataDestinationById(destinationId);
    }
  }, [router, destinationId]);

  return (
    <>
      <Head>
        <title>{destination ? destination.name : "Destination"}</title>
        <meta
          name="description"
          content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <PageHeader
          imageSrc={
            destination && destination.images && destination.images.length > 0
              ? getRandomImage(destination.images)
              : "/images/tour.svg"
          }
          title={destination ? destination.name : ""}
          pathPrefix={"Home / Destination"}
          pathSuffix={destination ? destination.id : ""}
          showSearchBar={false}
        />
        <DestinationInfo destination={destination} loading={loading} />        
        <Description title={`About ${destination?.name}`} description={destination ? destination.about : ""} />
        <BasicInfo destination={destination} />
        <TourPopular destinationId={destination?.id || ""} />
        <Activities destinationId={destination?.id || ""} />
        <Footer />
      </main>
    </>
  );
}
