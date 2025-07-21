
import "./Pagination.css";
import Image from "next/image";
import arrow from '../../../public/icons/arrow_pagination.svg'

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const renderPageNumbers = () => {
    const pages = [];

    if (currentPage > 2) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)}>1</button>
      );
      if (currentPage > 3) {
        pages.push(<span key="start-ellipsis">...</span>);
      }
    }

    if (currentPage > 1) {
      pages.push(
        <button key={currentPage - 1} onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </button>
      );
    }

    pages.push(
      <button key={currentPage} className="active">
        {currentPage}
      </button>
    );

    if (currentPage < totalPages) {
      pages.push(
        <button key={currentPage + 1} onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push(<span key="end-ellipsis">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <Image src={arrow} alt='arrow' width={6} style={{ transform: 'rotate(180deg)' }}/>
      </button>
      {renderPageNumbers()}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <Image src={arrow} alt='arrow' width={6} />
      </button>
    </div>
  );
}
