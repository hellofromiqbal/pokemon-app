'use client'

import { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import PokemonCard from '@/components/PokemonCard/PokemonCard';

interface Pokemon {
  id: string;
  nickname: string;
  description: string;
};

export default function FavoritePage() {
  const [favoritePokemon, setFavoritePokemon] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('myFavPokemon') || '[]');
    setFavoritePokemon(storedFavorites);
  }, []);

  return (
    <div className="p-4 lg:px-0 flex flex-col gap-4">
      <BackButton />
      <h1>Favorite Pokémon</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2">
        {favoritePokemon.map((pokemon: Pokemon, index) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
      </div>
    </div>
  );
};
