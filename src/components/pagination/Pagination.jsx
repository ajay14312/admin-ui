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
      {pageNumbers.map((page) => (
        <span
          style={{ color: `${selectedPage === page ? "red" : "black"}` }}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
