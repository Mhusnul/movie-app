import { useEffect, useState } from "react";
import {
  fetchTrending,
  fetchNowPlaying,
  fetchTopRated,
  fetchUpcoming,
  searchMovies,
} from "../api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Section from "../components/Section";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [tr, np, trt, up] = await Promise.all([
          fetchTrending(),
          fetchNowPlaying(),
          fetchTopRated(),
          fetchUpcoming(),
        ]);
        setTrending(tr);
        setNowPlaying(np);
        setTopRated(trt);
        setUpcoming(up);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleSearch(query) {
    if (!query) {
      setSearching(false);
      setSearchResults([]);
      return;
    }
    setSearching(true);
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-4xl font-bold mb-8"> Movie Hub</h1>

      <SearchBar onSearch={handleSearch} />

      {searching ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          {searchResults.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <Section title=" Trending" movies={trending} />
          <Section title=" Now Playing" movies={nowPlaying} />
          <Section title=" Top Rated" movies={topRated} />
          <Section title=" Upcoming" movies={upcoming} />
        </>
      )}
    </div>
  );
}
