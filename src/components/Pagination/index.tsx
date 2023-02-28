import { FC } from "react";
import { v4 } from "uuid";
interface PaginationProps {
  page: number;
  totalPage: number;
  onChange: (newPage: number) => any;
}

const Pagination: FC<PaginationProps> = ({ page, totalPage, onChange }) => {
  return (
    <div style={{ margin: "10px auto", textAlign: "center" }}>
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPage }, (_, index) => index + 1).map(
            (pageIndex) => {
              const isActive = pageIndex === page;
              const action = () => {
                if (pageIndex !== page) {
                  if (pageIndex !== undefined) {
                    onChange(Number(pageIndex));
                  }
                }
              };
              return isActive ? (
                <li className="page-item">
                  <button
                    className="page-link"
                    key={pageIndex}
                    onClick={action}
                    style={{ color: "red" }}
                  >
                    {pageIndex}
                  </button>
                </li>
              ) : (
                <li className="page-item">
                  <button className="page-link" key={v4()} onClick={action}>
                    {pageIndex}
                  </button>
                </li>
              );
            }
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
