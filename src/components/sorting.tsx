import React from "react";

type SortingProps = {
  sortBy: string;
  handleSorting: (sortBy: string, order: string) => void;
};

const Sorting: React.FC<SortingProps> = ({ sortBy, handleSorting }) => {
  const [isAsc, setIsAsc] = React.useState<boolean | undefined>(undefined);

  const handleSortingBoth = () => {
    if (isAsc === undefined || isAsc === false) {
      setIsAsc(true);
      handleSorting(sortBy, "asc");
    } else {
      setIsAsc(false);
      handleSorting(sortBy, "desc");
    }
  };

  const handleResetSorting = () => {
    setIsAsc(undefined);
  };

  const formattedSortBy = sortBy
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/\b\w/g, (word) => word.toUpperCase());

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        width: 100,
      }}
      onClick={handleSortingBoth}
    >
      <span style={{ fontSize: 12 }}>{formattedSortBy}</span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 30,
          marginLeft: 10,
        }}
      >
        <span
          role="img"
          aria-label="sort-asc"
          style={{
            cursor: "pointer",
            display:
              isAsc || typeof isAsc === 'undefined' ? "block" : "none",
          }}
          onClick={handleResetSorting}
        >
          {" ▲ "}
        </span>
        <span
          role="img"
          aria-label="sort-desc"
          style={{
            cursor: "pointer",
            display: !isAsc || typeof isAsc === 'undefined' ? "block" : "none",
          }}
          onClick={handleResetSorting}
        >
          {" ▼ "}
        </span>
      </div>
    </div>
  );
};

export default Sorting;
