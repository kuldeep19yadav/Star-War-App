import React, { useState, useEffect } from "react";
import CharacterList from "./components/CharacterList";

function App() {
  // State variables to manage data and UI states
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
 
   //  useEffect for triggers whenever 'page' changes
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setCharacters(data.results);
        setCount(data.count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    //   function fall when 'page' changes
    fetchCharacters();
  }, [page]);

  const totalPages = Math.ceil(count / 10);
  //  Page container
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Star Wars Characters</h1>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && <CharacterList characters={characters} />}

       {/*  Pagination section */}
      <div className="flex gap-4 mt-8">
        <button
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="text-lg">
          Page {page} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
