import React from "react";
import "./Table.css";

function Table({ data, loading, error }) {
  if (loading) {
    return <div className="spinner"><div className="loader"></div></div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!data.length) {
    return (
      <div className="no-results">
        {data.length === 0 ? "No result found" : "Start searching"}
      </div>
    );
  }

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td className="text-center">{index + 1}</td>
            <td>{item.name}</td>
            <td>
              <div className="country-details">
                <img
                  src={`https://flagsapi.com/${item.countryCode}/flat/24.png`}
                  alt={`${item.country} flag`}
                  className="country-flag"
                />
                {item.country}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
