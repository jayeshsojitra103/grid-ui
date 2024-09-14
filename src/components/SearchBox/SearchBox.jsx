import React, { useEffect, useRef, useState } from "react";
import "./SearchBox.css";

const SearchBox = ({ onSearch, loading }) => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const handleShortcut = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      e.preventDefault();
      inputRef?.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <div class="search-container">
      <input
        type="text"
        disabled={loading}
        value={searchText}
        onChange={handleChange}
        className="search-input"
        placeholder="Search places..."
        id="search-input"
        ref={inputRef}
      />
      <span class="shortcut">CTRL/CMD + /</span>
    </div>
  );
};

export default SearchBox;
