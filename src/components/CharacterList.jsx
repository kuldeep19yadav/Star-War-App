import React, { useState } from "react";
import CharacterCard from "./CharacterCard";

function CharacterList({ characters }) {
  //  State for search + filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHomeworld, setSelectedHomeworld] = useState("");
  const [selectedFilm, setSelectedFilm] = useState("");

  //  Extract unique dropdown options
  const homeworlds = [...new Set(characters.map((c) => c.homeworld))];
  const films = [...new Set(characters.flatMap((c) => c.films))];

  //  Combined filter logic
  const filteredCharacters = characters.filter((char) => {
    const matchesName = char.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHomeworld =
      !selectedHomeworld || char.homeworld === selectedHomeworld;
    const matchesFilm =
      !selectedFilm || char.films.includes(selectedFilm);

    return matchesName && matchesHomeworld && matchesFilm;
  });

  return (
    <div>
      {/*  Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border border-gray-400 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Homeworld filter */}
        <select
          value={selectedHomeworld}
          onChange={(e) => setSelectedHomeworld(e.target.value)}
          className="p-2 border border-gray-400 rounded-md text-black bg-white"
        >
          <option value="">All Homeworlds</option>
          {homeworlds.map((h, i) => (
            <option key={i} value={h}>
              {h}
            </option>
          ))}
        </select>

        {/* Film filter */}
        <select
          value={selectedFilm}
          onChange={(e) => setSelectedFilm(e.target.value)}
          className="p-2 border border-gray-400 rounded-md text-black bg-white"
        >
          <option value="">All Films</option>
          {films.map((f, i) => (
            <option key={i} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/*  Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((char, index) => (
            <CharacterCard key={index} character={char} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 font-semibold">
            No characters found.
          </p>
        )}
      </div>
    </div>
  );
}

export default CharacterList;
