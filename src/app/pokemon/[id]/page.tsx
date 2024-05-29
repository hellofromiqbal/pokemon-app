'use client'

import DetailTable from "@/components/DetailTable/DetailTable";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Type {
  type: {
    name: string;
    url: string;
  };
};

interface Move {
  move: {
    name: string;
    url: string;
  };
};

interface Ability {
  ability: {
    name: string;
    url: string;
  };
};

export interface PokemonData {
  name: string;
  weight: number;
  height: number;
  abilities: Ability[];
  sprites: {
    other: {
      'official-artwork': {
        front_shiny: string;
      };
    };
  };
  types: Type[];
  moves: Move[];
};

export default function Pokemon() {
  const { id } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [isFavoritePokemon, setIsFavoritePokemon] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data: PokemonData) => setPokemon(data))
        .catch((err) => console.error(err.message));
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      const myFavPokemon = JSON.parse(localStorage.getItem('myFavPokemon') || '[]');
      setIsFavoritePokemon(myFavPokemon.includes(id));
    };
  }, [id]);

  const handleFavoriteClick = () => {
    if (id) {
      const myFavPokemon = JSON.parse(localStorage.getItem('myFavPokemon') || '[]');
      if (myFavPokemon.includes(id)) {
        const newFavPokemon = myFavPokemon.filter((favoriteId: string) => favoriteId !== id);
        localStorage.setItem('myFavPokemon', JSON.stringify(newFavPokemon));
        setIsFavoritePokemon(false);
        alert(`Pokemon with ID ${id} has been removed from your favorites!`);
      } else {
        myFavPokemon.push(id);
        localStorage.setItem('myFavPokemon', JSON.stringify(myFavPokemon));
        setIsFavoritePokemon(true);
        alert(`Pokemon with ID ${id} has been added to your favorites!`);
      };
    };
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  };

  return (
    <div className="flex flex-col gap-4">
      <button className="self-start text-lg" onClick={() => router.back()}>Back</button>
      <div className="flex justify-center">
        <Image
          src={pokemon.sprites.other['official-artwork'].front_shiny}
          alt={pokemon.name}
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
        <DetailTable pokemon={pokemon} />
        <button
          className={`${isFavoritePokemon ? "bg-red-700" : "bg-blue-700"} text-white px-3 py-2 rounded-md mr-auto`}
          onClick={handleFavoriteClick}
        >
          {isFavoritePokemon ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
};
