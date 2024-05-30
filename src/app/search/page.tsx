'use client'

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton/BackButton";
import PokemonCard from "@/components/PokemonCard/PokemonCard";

interface Pokemon {
  name: string;
  url: string;
};

export default function SearchPage() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1302')
      .then((res) => res.json())
      .then((data) => setAllPokemon(data.results))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if(searchInput){
      const results = allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredPokemon(results);
    } else {
      setFilteredPokemon([]);
    };
  }, [searchInput, allPokemon]);

  return (
    <div className="p-4 lg:px-0 flex flex-col gap-4">
      <div className='flex justify-between items-center'>
        <BackButton />
        <h2 className='font-bold text-xl'>Search Pokemon</h2>
      </div>
      <input
        type="search"
        name="searchBar"
        id="searchBar"
        placeholder="Pikachu"
        autoFocus
        className="px-6 py-2 border rounded-full"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon}/>
          ))
        ) : (
          searchInput !== ""? (
            searchInput && <p className="text-center">No Pokemon found...</p>
          ) : (
            <p className="text-center">Let us search pokemon!</p>
          )
        )}
      </div>
    </div>
  );
};
