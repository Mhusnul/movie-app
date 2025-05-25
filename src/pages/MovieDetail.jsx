import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../api";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      try {
        const data = await fetchMovieDetail(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (!movie)
    return <p className="text-white text-center mt-10">Movie not found</p>;

  return (
    <div className="relative min-h-screen text-white">
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50 blur-sm"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>

      {/* Overlay content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-10 items-start">
        {/* Movie Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-2xl w-full max-w-xs"
        />

        {/* Movie Info */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {movie.title}
          </h1>

          <div className="mb-4 text-sm md:text-base text-gray-300 space-x-4">
            <span className="bg-red-600 text-white px-2 py-1 rounded">
              {movie.vote_average.toFixed(1)} ★
            </span>
            <span>{movie.release_date}</span>
            <span>{movie.genres.map((g) => g.name).join(", ")}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="btn btn-error bg-red-600 text-white px-6 text-lg">
              Play
            </button>
            <button className="btn btn-outline"> My List</button>
            <button className="btn btn-outline ">Like</button>
            <button className="btn btn-outline ">Share</button>
          </div>

          <p className="text-lg text-gray-200 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
