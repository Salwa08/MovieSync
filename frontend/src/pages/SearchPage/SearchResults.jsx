import React from "react";

function SearchResults({
  isLoading,
  hasSearched,
  movies = [],
  clearSearch,
  Button,
  Link,
  MovieCard,
}) {
  return (
    <main className="w-full max-w-screen-lg mx-auto flex flex-col items-center px-4 py-8">
      
      {hasSearched && (isLoading || movies.length > 0) && (
        <div className="mb-8 w-full flex flex-col items-center">
          <h1 className="text-xl font-medium text-center">
            {isLoading ? "Searching..." : "Here's what we found for you"}
          </h1>
        </div>
      )}

      
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full justify-center">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] bg-gray-800 rounded-md mb-3"></div>
              <div className="h-4 bg-gray-800 rounded mb-2"></div>
              <div className="h-3 bg-gray-800 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      )}

     
      {!isLoading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full justify-center">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      
      {!isLoading && movies.length === 0 && hasSearched && (
        <div className="flex flex-col items-center justify-center py-16 w-full">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">No movies found</h2>
          <p className="text-gray-400 text-center max-w-md mb-6">
            We couldn't find any movies matching your search. Try different
            keywords or browse our categories.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={clearSearch}
              variant="outline"
              className="border-gray-600 hover:bg-gray-800"
            >
              Clear Search
            </Button>
            <Link to="/home">
              <Button className="bg-red-600 hover:bg-red-700">
                Browse Movies
              </Button>
            </Link>
          </div>
        </div>
      )}

      
      {!hasSearched && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 w-full">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Start your search</h2>
          <p className="text-gray-400 text-center max-w-md">
            Enter a movie title, actor, or genre to discover your next favorite
            film.
          </p>
        </div>
      )}
    </main>
  );
}

export default SearchResults;
