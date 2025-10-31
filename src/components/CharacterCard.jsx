import React, { useState } from "react";
import CharacterModal from "./CharacterModal";

// Logic Displays a single Star Wars character card with dynamic background color.
function CharacterCard({ character }) {
  const [open, setOpen] = useState(false);

  // Generate a unique random image based on character name
  const randomImage = `https://picsum.photos/seed/${character.name}/300/300`;

  // Map SWAPI species URLs to readable species names
  const speciesMap = {
    "https://swapi.dev/api/species/1/": "Human",
    "https://swapi.dev/api/species/2/": "Droid",
    "https://swapi.dev/api/species/3/": "Wookiee",
    "https://swapi.dev/api/species/4/": "Rodian",
    "https://swapi.dev/api/species/5/": "Hutt",
  };

//   Tailwind background color to each species
  const speciesColors = {
    Human: "bg-blue-800",
    Droid: "bg-gray-700",
    Wookiee: "bg-amber-800",
    Rodian: "bg-green-800",
    Hutt: "bg-red-800",
    default: "bg-slate-800",
  };

    // Determine species and card color
  const speciesURL = character.species?.[0];
  const speciesName = speciesMap[speciesURL] || "default";
  const cardColor = speciesColors[speciesName] || speciesColors.default;

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`${cardColor} p-4 rounded-xl shadow hover:shadow-lg hover:scale-105 cursor-pointer transition`}
      >
        <img
          src={randomImage}
          alt={character.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-center">{character.name}</h2>
      </div>

      {open && (
        <CharacterModal character={character} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default CharacterCard;
