import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Galley from "@/components/common/Gallery";
import { useDestinationContext } from "@/contexts/DestinationContext";
import DestinationService from "@/services/api/destinationService";
import { toast } from "react-toastify";

const DestinationGalley: React.FC = () => {
  // const { destinations, setDestinations } = useDestinationContext();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await DestinationService.getDestinations();
  //       if (response.status === 200) {
  //         setDestinations(response.data);
  //       } else {
  //         toast.error(response.data.msg);
  //       }
  //     } catch (error) {
  //       toast.error("An error occurred while fetching destinations.");
  //     }
  //   };

  //   fetchData();
  // }, [setDestinations]);

  const destinations = [
    // {
    //   id: "66cc10dfee19e349e295b6f0",
    //   name: "Brazil",
    //   about:
    //     "Brazil is famous for its vibrant culture, carnival festivals, and the Amazon Rainforest. The capital city is Brasília, known for its modern architecture.",
    //   continent: "South America",
    //   map_link: "https://maps.example.com/brasilia",
    //   weather: {
    //     jan_fev: [25, 30],
    //     mar_apr: [24, 29],
    //     may_jun: [22, 28],
    //     jul_ago: [21, 27],
    //     sep_oct: [22, 28],
    //     nov_dec: [24, 29],
    //   },
    //   language: ["Portuguese"],
    //   currency: "Brazilian Real",
    //   area: 8515767,
    //   population: 212559417,
    //   time_zone: "BRT",
    //   time_to_travel: ["Jun", "Jul", "Aug"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fbrazil.jpg?alt=media&token=f894debf-230e-4d3f-8df0-34f2690d4249",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc112aee19e349e295b6f1",
    //   name: "Japan",
    //   about:
    //     "Japan is renowned for its technological advancements, traditional temples, and unique culture. Tokyo, the capital, is a bustling metropolis with a blend of modern and traditional attractions.",
    //   continent: "Asia",
    //   map_link: "https://maps.example.com/tokyo",
    //   weather: {
    //     jan_fev: [0, 7],
    //     mar_apr: [4, 12],
    //     may_jun: [12, 20],
    //     jul_ago: [22, 30],
    //     sep_oct: [17, 25],
    //     nov_dec: [8, 15],
    //   },
    //   language: ["Japanese"],
    //   currency: "Yen",
    //   area: 377975,
    //   population: 126476461,
    //   time_zone: "JST",
    //   time_to_travel: ["Mar", "Apr", "May"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fjapan.jpg?alt=media&token=5730d862-904d-409b-b3f7-2739112c8586",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc119dee19e349e295b6f2",
    //   name: "Australia",
    //   about:
    //     "Australia is known for its stunning landscapes, including the Great Barrier Reef and unique wildlife. Sydney, its largest city, is famous for the Sydney Opera House and Harbour Bridge.",
    //   continent: "Australia",
    //   map_link: "https://maps.example.com/sydney",
    //   weather: {
    //     jan_fev: [20, 30],
    //     mar_apr: [18, 28],
    //     may_jun: [14, 24],
    //     jul_ago: [10, 20],
    //     sep_oct: [12, 22],
    //     nov_dec: [16, 26],
    //   },
    //   language: ["English"],
    //   currency: "Australian Dollar",
    //   area: 7692024,
    //   population: 25499884,
    //   time_zone: "AEST",
    //   time_to_travel: ["Dec", "Jan", "Feb"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Faustralia.jpg?alt=media&token=6fd0371a-63fb-4492-8425-fd001d7d098c",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc11deee19e349e295b6f3",
    //   name: "South Africa",
    //   about:
    //     "South Africa boasts a rich cultural diversity and natural beauty, from the Kruger National Park to the vibrant city of Cape Town. Johannesburg is a major city known for its history and commerce.",
    //   continent: "Africa",
    //   map_link: "https://maps.example.com/johannesburg",
    //   weather: {
    //     jan_fev: [20, 30],
    //     mar_apr: [18, 28],
    //     may_jun: [10, 24],
    //     jul_ago: [7, 21],
    //     sep_oct: [10, 25],
    //     nov_dec: [16, 30],
    //   },
    //   language: ["Afrikaans", "English", "Zulu", "Xhosa"],
    //   currency: "South African Rand",
    //   area: 1219090,
    //   population: 59308690,
    //   time_zone: "SAST",
    //   time_to_travel: ["Sep", "Oct", "Nov"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fsouth_africa.jpg?alt=media&token=857bb34b-e2e1-4266-be62-b3f0bcef760c",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc1240ee19e349e295b6f4",
    //   name: "Canada",
    //   about:
    //     "Canada is known for its breathtaking natural landscapes, including the Rocky Mountains and Niagara Falls. The capital city, Ottawa, is renowned for its rich history and vibrant cultural scene.",
    //   continent: "North America",
    //   map_link: "https://maps.example.com/ottawa",
    //   weather: {
    //     jan_fev: [-10, -2],
    //     mar_apr: [-5, 5],
    //     may_jun: [5, 15],
    //     jul_ago: [15, 25],
    //     sep_oct: [10, 20],
    //     nov_dec: [-5, 5],
    //   },
    //   language: ["English", "French"],
    //   currency: "Canadian Dollar",
    //   area: 9976140,
    //   population: 37742154,
    //   time_zone: "EST",
    //   time_to_travel: ["Jun", "Jul", "Aug"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fcanada.jpg?alt=media&token=8c1032c9-5035-4e3f-aa71-053d24b36dcd",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc189dee19e349e295b6f5",
    //   name: "France",
    //   about:
    //     "The capital city of France is Paris, known for its rich history, art, and culture. The Eiffel Tower is one of its most iconic landmarks.",
    //   continent: "Europe",
    //   map_link: "https://maps.example.com/paris",
    //   weather: {
    //     jan_fev: [2, 7],
    //     mar_apr: [5, 12],
    //     may_jun: [12, 18],
    //     jul_ago: [18, 25],
    //     sep_oct: [12, 18],
    //     nov_dec: [5, 10],
    //   },
    //   language: ["French"],
    //   currency: "Euro",
    //   area: 551695,
    //   population: 65273511,
    //   time_zone: "CET",
    //   time_to_travel: ["Jan", "Feb", "Mar"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Ffrance.jpg?alt=media&token=6acbf7fa-0469-42cc-9a16-ec5b8118ba8c",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc1956ee19e349e295b6f6",
    //   name: "United States",
    //   about:
    //     "The United States is a diverse country with iconic landmarks like the Statue of Liberty and the Grand Canyon. Washington, D.C., the capital, is known for its historical monuments and museums.",
    //   continent: "North America",
    //   map_link: "https://maps.example.com/washingtondc",
    //   weather: {
    //     jan_fev: [-5, 5],
    //     mar_apr: [0, 15],
    //     may_jun: [10, 25],
    //     jul_ago: [20, 35],
    //     sep_oct: [10, 25],
    //     nov_dec: [0, 15],
    //   },
    //   language: ["English"],
    //   currency: "US Dollar",
    //   area: 9372610,
    //   population: 331002651,
    //   time_zone: "EST",
    //   time_to_travel: ["May", "Jun", "Sep"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Funited_states.jpg?alt=media&token=fdce3f42-88c0-4677-beaf-ad47140bd792",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc19b2ee19e349e295b6f7",
    //   name: "India",
    //   about:
    //     "India is a diverse country with a rich cultural heritage and vibrant traditions. New Delhi, the capital, is a blend of historical sites and modern development, with a bustling atmosphere.",
    //   continent: "Asia",
    //   map_link: "https://maps.example.com/newdelhi",
    //   weather: {
    //     jan_fev: [10, 20],
    //     mar_apr: [15, 30],
    //     may_jun: [25, 40],
    //     jul_ago: [25, 35],
    //     sep_oct: [20, 30],
    //     nov_dec: [10, 25],
    //   },
    //   language: ["Hindi", "English"],
    //   currency: "Indian Rupee",
    //   area: 3287263,
    //   population: 1380004385,
    //   time_zone: "IST",
    //   time_to_travel: ["Oct", "Nov", "Dec"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Findia.jpg?alt=media&token=f452f7ec-3d31-4c5f-9e76-c509315d51d6",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc19f5ee19e349e295b6f8",
    //   name: "Egypt",
    //   about:
    //     "Egypt is famous for its ancient civilization, including the Pyramids of Giza and the Sphinx. Cairo, the capital, is a vibrant city with a rich history and bustling markets.",
    //   continent: "Africa",
    //   map_link: "https://maps.example.com/cairo",
    //   weather: {
    //     jan_fev: [10, 20],
    //     mar_apr: [15, 25],
    //     may_jun: [20, 30],
    //     jul_ago: [25, 35],
    //     sep_oct: [20, 30],
    //     nov_dec: [15, 25],
    //   },
    //   language: ["Arabic"],
    //   currency: "Egyptian Pound",
    //   area: 1001450,
    //   population: 91250000,
    //   time_zone: "EET",
    //   time_to_travel: ["Mar", "Apr", "Oct"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fegypt.jpg?alt=media&token=2bab349b-843a-4e5d-88eb-6a664089ae04",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc1a30ee19e349e295b6f9",
    //   name: "Argentina",
    //   about:
    //     "Argentina is known for its diverse landscapes, from the Andes Mountains to the Pampas grasslands. Buenos Aires, the capital, is famous for its rich cultural scene and tango music.",
    //   continent: "South America",
    //   map_link: "https://maps.example.com/buenosaires",
    //   weather: {
    //     jan_fev: [20, 30],
    //     mar_apr: [15, 25],
    //     may_jun: [10, 20],
    //     jul_ago: [5, 15],
    //     sep_oct: [10, 20],
    //     nov_dec: [15, 25],
    //   },
    //   language: ["Spanish"],
    //   currency: "Argentine Peso",
    //   area: 2780400,
    //   population: 45195777,
    //   time_zone: "ART",
    //   time_to_travel: ["Dec", "Jan", "Feb"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fargentina.jpg?alt=media&token=6debd130-f18c-4057-8158-3de472c51bd1",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc1a4bee19e349e295b6fa",
    //   name: "Russia",
    //   about:
    //     "Russia is the largest country in the world, with diverse landscapes ranging from Siberian tundra to the vibrant city of Moscow. Moscow is known for its historic Red Square and the Kremlin.",
    //   continent: "Europe",
    //   map_link: "https://maps.example.com/moscow",
    //   weather: {
    //     jan_fev: [-10, -5],
    //     mar_apr: [-5, 5],
    //     may_jun: [5, 15],
    //     jul_ago: [10, 20],
    //     sep_oct: [5, 10],
    //     nov_dec: [-5, -10],
    //   },
    //   language: ["Russian"],
    //   currency: "Russian Ruble",
    //   area: 17098242,
    //   population: 145912025,
    //   time_zone: "MSK",
    //   time_to_travel: ["Jun", "Jul", "Aug"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Frussia.jpg?alt=media&token=1cd74af4-f3c5-4593-8311-a0b1a92a0193",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc1ab9ee19e349e295b6fb",
    //   name: "Mexico",
    //   about:
    //     "Mexico is known for its rich cultural heritage, ancient ruins, and vibrant cities. Mexico City, the capital, offers a mix of historical sites and modern attractions.",
    //   continent: "North America",
    //   map_link: "https://maps.example.com/mexicocity",
    //   weather: {
    //     jan_fev: [15, 25],
    //     mar_apr: [20, 30],
    //     may_jun: [25, 35],
    //     jul_ago: [25, 35],
    //     sep_oct: [20, 30],
    //     nov_dec: [15, 25],
    //   },
    //   language: ["Spanish"],
    //   currency: "Mexican Peso",
    //   area: 1964375,
    //   population: 128932753,
    //   time_zone: "CST",
    //   time_to_travel: ["Dec", "Jan", "Feb"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fmexico.jpg?alt=media&token=982cf8c3-bac5-45e2-acd4-4582901a029b",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc1fd56daa142cd2b41a37",
    //   name: "China",
    //   about:
    //     "China is known for its rich history, diverse landscapes, and the Great Wall. Beijing, the capital, is home to historic sites like the Forbidden City and modern developments.",
    //   continent: "Asia",
    //   map_link: "https://maps.example.com/beijing",
    //   weather: {
    //     jan_fev: [-5, 5],
    //     mar_apr: [0, 15],
    //     may_jun: [10, 25],
    //     jul_ago: [20, 35],
    //     sep_oct: [10, 25],
    //     nov_dec: [0, 10],
    //   },
    //   language: ["Mandarin"],
    //   currency: "Renminbi",
    //   area: 9596961,
    //   population: 1393409038,
    //   time_zone: "CST",
    //   time_to_travel: ["Apr", "May", "Oct"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fchina.jpg?alt=media&token=8acf8c67-1671-488a-b265-ed19bd1d45a0",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc202820e0139144b163e7",
    //   name: "New Zealand",
    //   about:
    //     "New Zealand is famous for its stunning natural beauty, from fjords to beaches. Wellington, the capital, is known for its vibrant arts scene and beautiful harbor.",
    //   continent: "Australia",
    //   map_link: "https://maps.example.com/wellington",
    //   weather: {
    //     jan_fev: [15, 25],
    //     mar_apr: [12, 22],
    //     may_jun: [8, 18],
    //     jul_ago: [5, 15],
    //     sep_oct: [8, 18],
    //     nov_dec: [12, 22],
    //   },
    //   language: ["English", "Māori"],
    //   currency: "New Zealand Dollar",
    //   area: 268021,
    //   population: 4822233,
    //   time_zone: "NZST",
    //   time_to_travel: ["Dec", "Jan", "Feb"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fnew_zealand.jpg?alt=media&token=f6606919-8f4f-44dc-9151-4b0236694fd6",
    //   ],
    //   travel_count: 0,
    // },
    // {
    //   id: "66cc208720e0139144b163e8",
    //   name: "Germany",
    //   about:
    //     "Germany is known for its strong economy, rich history, and cultural heritage. Berlin, the capital, is renowned for its historic sites and vibrant arts scene.",
    //   continent: "Europe",
    //   map_link: "https://maps.example.com/berlin",
    //   weather: {
    //     jan_fev: [0, 5],
    //     mar_apr: [5, 12],
    //     may_jun: [10, 18],
    //     jul_ago: [15, 25],
    //     sep_oct: [10, 18],
    //     nov_dec: [5, 10],
    //   },
    //   language: ["German"],
    //   currency: "Euro",
    //   area: 357022,
    //   population: 83783942,
    //   time_zone: "CET",
    //   time_to_travel: ["May", "Jun", "Sep"],
    //   images: [
    //     "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/destinations%2Fgermany.jpg?alt=media&token=8859c7a5-3e5c-49e7-beb3-619d2f29093a",
    //   ],
    //   travel_count: 0,
    // },
  ];

  // Helper function to chunk destinations into groups of 6
  const chunkDestinations = (destinations: any[], size: number) => {
    const result: any[][] = [];
    for (let i = 0; i < destinations.length; i += size) {
      result.push(destinations.slice(i, i + size));
    }
    return result;
  };

  // Chunk destinations into groups of 6
  const destinationChunks = chunkDestinations(destinations, 6);

  return (
    <section className={styles.destinationGalley}>
      <div className={styles.destinationContainer}>
        {destinationChunks.map((chunk, index) => (
          <Galley
            key={index}
            destinations={chunk}
            reverse={index % 2 === 1} // Apply reverse={true} to odd-indexed chunks
          />
        ))}
      </div>
    </section>
  );
};

export default DestinationGalley;
