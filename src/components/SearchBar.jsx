import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 flex justify-center items-center"
      style={{
        backgroundColor: "#141414", // background gelap khas Netflix
        padding: "8px 16px",
        borderRadius: "9999px", // pill shape
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <input
        type="text"
        placeholder="Search for movies, shows, genres..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
        style={{
          fontSize: "1.1rem",
          padding: "10px 12px",
          border: "none",
        }}
      />
      <button
        type="submit"
        className="ml-4 font-semibold rounded px-5 py-2"
        style={{
          backgroundColor: "#e50914", // merah Netflix
          color: "white",
          fontWeight: "700",
          fontSize: "1rem",
          cursor: "pointer",
          border: "none",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f40612")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e50914")}
      >
        Search
      </button>
    </form>
  );
}
