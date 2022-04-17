import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Pagination.css";

const Pagination = ({ selectedPage, totalPages, onPageChange }) => {
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const pageNumbers = Array.from(range(1, totalPages, 1));

  return (
    <div className="pagination-container">
      <div className={`circle ${selectedPage === 1 ? "disabled" : ""}`}>
        <FontAwesomeIcon
          icon={faAngleDoubleLeft}
          onClick={() => onPageChange(1)}
        />
      </div>
      <div className={`circle ${selectedPage === 1 ? "disabled" : ""}`}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={() => onPageChange(selectedPage - 1)}
        />
      </div>
      {pageNumbers.map((page) => (
        <div
          className={`circle ${selectedPage === page ? "selected" : ""}`}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
      <div
        className={`circle ${selectedPage === totalPages ? "disabled" : ""}`}
      >
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => onPageChange(selectedPage + 1)}
        />
      </div>
      <div
        className={`circle ${selectedPage === totalPages ? "disabled" : ""}`}
      >
        <FontAwesomeIcon
          icon={faAngleDoubleRight}
          onClick={() => onPageChange(totalPages)}
        />
      </div>
    </div>
  );
};

export default Pagination;
