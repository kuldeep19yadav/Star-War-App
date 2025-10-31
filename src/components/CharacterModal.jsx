import React, { useEffect, useState } from "react";

//  Function for showing Star Wars character
function CharacterModal({ character, onClose }) {
    // State for storing full homeworld info
  const [homeworld, setHomeworld] = useState({
    name: "",
    terrain: "",
    climate: "",
    population: "",
  });

  const formattedDate = new Date(character.created).toLocaleDateString("en-GB");
  const filmCount = character.films?.length || 0;

   //  Fetch homeworld details when modal opens
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (character.homeworld) {
          const res = await fetch(character.homeworld);
          const data = await res.json();
          setHomeworld({
            name: data.name,
            terrain: data.terrain,
            climate: data.climate,
            population: data.population,
          });
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, [character]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-slate-800 text-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✖
        </button>

        <img
          src={`https://picsum.photos/seed/${character.name}/400/300`}
          alt={character.name}
          className="w-full h-52 object-cover rounded-xl mb-4"
        />

        <h2 className="text-2xl font-bold mb-2 text-center">
          {character.name}
        </h2>

        <div className="space-y-1 text-sm text-gray-300">
          <p>
            <strong>Height:</strong> {character.height} cm
          </p>
          <p>
            <strong>Mass:</strong> {character.mass} kg
          </p>
          <p>
            <strong>Date added:</strong> {formattedDate}
          </p>
          <p>
            <strong>No of Films appeared in:</strong> {filmCount}
          </p>
          <p>
            <strong>Birth Year:</strong> {character.birth_year}
          </p>
        </div>

        <div className="mt-5 border-t border-gray-600 pt-3">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">
             Homeworld Details
          </h3>

          {homeworld.name ? (
            <div className="space-y-1 text-sm text-gray-300">
              <p>
                <strong>Name:</strong> {homeworld.name}
              </p>
              <p>
                <strong>Terrain:</strong> {homeworld.terrain}
              </p>
              <p>
                <strong>Climate:</strong> {homeworld.climate}
              </p>
              <p>
                <strong>Population:</strong> {homeworld.population}
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              Loading homeworld details...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;
