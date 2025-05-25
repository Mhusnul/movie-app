import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="min-w-[150px] md:min-w-[180px] flex-shrink-0 group"
    >
      <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 group-hover:scale-105">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      <h3 className="mt-2 text-sm font-semibold truncate">{movie.title}</h3>
      <p className="text-xs text-gray-400">{movie.release_date?.slice(0, 4)}</p>
    </Link>
  );
}
