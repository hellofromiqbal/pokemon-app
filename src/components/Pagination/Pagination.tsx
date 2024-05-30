type PaginationProps = {
  previous: string | null;
  next: string | null;
  handlePagination: (newUrl: string) => void;
};

export default function Pagination({ previous, next, handlePagination }: PaginationProps) {
  return (
    <div className="flex">
      {previous &&
        <button
          className="bg-blue-700 text-white px-3 py-2 rounded-md mr-auto"
          onClick={() => handlePagination(previous)}
        >
          Prev
        </button>
      }
      {next &&
        <button
          className="bg-blue-700 text-white px-3 py-2 rounded-md ml-auto"
          onClick={() => handlePagination(next)}
        >
          Next
        </button>
      }
    </div>
  );
};
