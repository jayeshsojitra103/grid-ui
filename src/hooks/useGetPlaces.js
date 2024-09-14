import { useEffect, useState } from "react";
import { getPlaces } from "../lib/api";
import { useDebounce } from "./useDebounce";

export const useGetPlaces = () => {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(5);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedQuery = useDebounce(query, 500);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPlaces(debouncedQuery, limit, currentPage);
      setData(result.data);
      setTotalPages(Math.ceil(result.metadata.totalCount / limit));
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, limit, currentPage]);

  const handleSearch = (searchText) => {
    setQuery(searchText);
    setCurrentPage(1);
  };

  const handleLimitChange = (newLimit) => {
    if (newLimit > 10) {
      alert("Limit cannot exceed 10");
    } else if (newLimit >= 0) {
      setLimit(newLimit);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    handleLimitChange,
    handleSearch,
    data,
    loading,
    error,
    limit,
    currentPage,
    totalPages,
    handlePageChange,
  };
};
