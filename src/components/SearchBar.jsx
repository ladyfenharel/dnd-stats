// SearchBar.js
import React from "react";

function SearchBar({ onSearch }) {
    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                style={{ padding: "8px", width: "200px", marginRight: "10px" }}
            />
            <button style={{ marginRight: "5px" }}>Search</button>
            <button onClick={() => onSearch("")}>Reset</button>
        </div>
    );
}

export default SearchBar;
