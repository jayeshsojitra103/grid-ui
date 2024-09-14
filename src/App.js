import SearchBox from "./components/SearchBox/SearchBox";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";
import { useGetPlaces } from "./hooks/useGetPlaces";
import "./App.css";

function App() {
  const {
    handleLimitChange,
    handleSearch,
    data,
    loading,
    error,
    limit,
    currentPage,
    totalPages,
    handlePageChange,
  } = useGetPlaces();

  return (
    <div className="App">
      <SearchBox onSearch={handleSearch} loading={loading} />
      <Table data={data} loading={loading} error={error} />
      <div className="footer">
        {totalPages > 1 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : (
          <div className="pagination"></div>
        )}
        <div className="limit-selector">
        <input
              disabled={loading}
              type="number"
              value={limit}
              onChange={(e) => handleLimitChange(parseInt(e.target.value, 10))}
              min="0"
              max="10"
            />
        </div>
      </div>
    </div>
  );
}

export default App;
