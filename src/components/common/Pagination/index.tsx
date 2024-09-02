import React from "react";
import styles from "./styles.module.scss";
import { PiGreaterThanBold, PiLessThanBold } from "react-icons/pi";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <PiLessThanBold />
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className={styles.pageButton}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <PiGreaterThanBold />
      </button>
    </div>
  );
};

export default Pagination;
