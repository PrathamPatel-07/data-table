
import React, { useState } from "react";
import "./App.css";
const productNames = [
  "Wireless Mouse",
  "Keyboard",
  "Headphones",
  "Smart Watch",
  "USB Cable",
  "Laptop Stand",
  "Bluetooth Speaker",
  "Power Bank",
  "Webcam",
  "Phone Case",
  "Monitor",
  "USB Hub"
];
const categories = [
  "Electronics",
  "Accessories",
  "Computer",
  "Mobile"
];
// Generate 60 products
const products = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  name: `${productNames[index % productNames.length]} ${Math.floor(index / productNames.length) + 1}`,
  category: categories[index % categories.length],
  price: 200 + ((index * 137) % 4800)
}));

const App = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  // Search by product name or category
  let searchData = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  // Sort by name or price
  const sortData = (type) => {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }

    setCurrentPage(1);
  };

  // Apply sorting
  if (sortType !== "") {
    searchData.sort((a, b) => {
      let result;

      if (sortType === "name") {
        result = a.name.localeCompare(b.name);
      } else {
        result = a.price - b.price;
      }

      return sortOrder === "asc" ? result : -result;
    });
  }

  // Pagination calculations
  const totalPages = Math.ceil(searchData.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const displayData = searchData.slice(startIndex, endIndex);

  // Search handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Product Data Table</h1>
      <p className="subtitle">Choose Your Products By Your Choice.</p>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={handleSearch}
        />

        <button onClick={() => sortData("name")}>
          Sort by Name {sortType === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>

        <button onClick={() => sortData("price")}>
          Sort by Price {sortType === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
      </div>

      <p className="result">
        Total products found: {searchData.length}
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Product Price (₹)</th>
            </tr>
          </thead>

          <tbody>
            {displayData.length > 0 ? (
              displayData.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price.toLocaleString("en-IN")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {searchData.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}


    </div>
  );
};

export default App;
