import React, { useState } from "react";
import styles from "./styles.module.scss";
import CardExperience from "@/components/common/CardExperience";
import Sorting from "@/components/common/Sorting";

const Search: React.FC = () => {
  const [results, setResults] = useState([
    {
      id: "1",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Rio de Janeiro",
      name: "Sunset Cruise in Rio",
      rating: 4.8,
      reviews: 180,
      duration: "2.5 hours",
      price: "150",
      isActivity: true,
    },
    {
      id: "2",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Petropolis",
      name: "Mountain Hike Adventure",
      rating: 4.7,
      reviews: 95,
      duration: "4 hours",
      price: "80",
      isActivity: true,
    },
    {
      id: "3",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Iguazu",
      name: "Iguazu Falls Tour",
      rating: 5.0,
      reviews: 220,
      duration: "2 days",
      price: "200",
      isActivity: true,
    },
    {
      id: "4",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Salvador",
      name: "Cultural Festival Experience",
      rating: 4.6,
      reviews: 150,
      duration: "5 hours",
      price: "100",
      isActivity: true,
    },
  ]);
  const [sortOption, setSortOption] = useState<string>("name");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleSortChange = (selectedOption: string, isAscending: boolean) => {
    setSortOption(selectedOption);
    setIsAscending(isAscending);
  };

  const sortResults = (data: typeof results) => {
    return [...data].sort((a, b) => {
      const aValue = a[sortOption as keyof typeof a];
      const bValue = b[sortOption as keyof typeof b];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        // Comparação para valores de string (nome, cidade, etc.)
        return isAscending
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        // Comparação para valores numéricos (rating, reviews, etc.)
        return isAscending ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  };

  const sortedResults = sortResults(results);

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <div className={styles.filters}>
          <div className={styles.filter}>
            <input type="text" placeholder="Search..." />
          </div>
          <div className={styles.filter}>
            <h4>Price Range</h4>
            {/* Add range input or slider */}
          </div>
          <div className={styles.filter}>
            <h4>Categories</h4>
            <label>
              <input type="checkbox" /> Category 1
            </label>
            <label>
              <input type="checkbox" /> Category 2
            </label>
            {/* Add more categories */}
          </div>
          <div className={styles.filter}>
            <h4>Destinations</h4>
            <label>
              <input type="checkbox" /> Continent 1
            </label>
            <label>
              <input type="checkbox" /> Continent 2
            </label>
            {/* Add more continents */}
          </div>
          <div className={styles.filter}>
            <h4>Reviews</h4>
            <label>
              <input type="checkbox" /> 4 Stars & Up
            </label>
            <label>
              <input type="checkbox" /> 3 Stars & Up
            </label>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <span>
              {sortedResults.length} {sortedResults.length > 1 ? "Tours" : "Tour"}
            </span>
            <Sorting onSortChange={handleSortChange} />
          </div>
          <div className={`${sortedResults.length > 0 ? styles.resultsList : styles.noResultsList}`}>
            {sortedResults.length > 0 ? (
              sortedResults.map((result, index) => (
                <div key={index} className={styles.resultItem}>
                  <CardExperience
                    id={result.id}
                    image={result.image}
                    location={{ country: result.country, city: result.city }}
                    name={result.name}
                    rating={result.rating}
                    reviews={result.reviews}
                    duration={result.duration}
                    price={result.price}
                    isActivity={result.isActivity}
                  />
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                No tours available
              </div>
            )}
          </div>
          <div className={styles.pagination}>
            {/* Implement pagination controls */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
