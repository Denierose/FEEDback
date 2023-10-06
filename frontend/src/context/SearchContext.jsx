// SearchProvider.js
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const [ratingFilter, setRatingFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  const sortData = (data, order) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      if (order === "asc") {
        return a.averageRating - b.averageRating;
      } else {
        return b.averageRating - a.averageRating;
      }
    });
    return sorted;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/review/getAllReview")
      .then((response) => {
        const feedbackData = response.data;
        const filteredData = feedbackData.filter((feedback) => {
          const searchCondition =
            (!searchQuery ||
              feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              feedback.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (typeFilter === "All" || feedback.type === typeFilter); // Consider type filter
          return searchCondition;
        });

        const reviewsWithAverageRating = filteredData.map((feedback) => {
          const ratingValues = feedback.rating.map((ratingId) => {
            return ratingId.rating;
          });

          const averageRating =
            ratingValues.length > 0
              ? ratingValues.reduce((total, value) => total + value, 0) / ratingValues.length
              : 0;

          return {
            ...feedback,
            averageRating,
          };
        });

        const sorted = sortData(reviewsWithAverageRating, sortOrder);
        setSortedData(sorted);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [ratingFilter, searchQuery, sortOrder, typeFilter]); // Include typeFilter in the dependency array

  const handleRatingFilterChange = (e) => {
    setRatingFilter(e.target.value);

    if (e.target.value === "HighToLow") {
      setSortOrder("desc");
    } else if (e.target.value === "LowToHigh") {
      setSortOrder("asc");
    } 
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const iframeSearchQuery = sortedData.length > 0 ? sortedData[0].title : searchQuery;

  const contextValue = {
    ratingFilter,
    typeFilter,
    handleRatingFilterChange,
    handleTypeFilterChange, 
    sortedData,
    iframeSearchQuery,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
