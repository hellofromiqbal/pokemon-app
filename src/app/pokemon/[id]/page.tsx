'use client'

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Type = {
  type: {
    name: string;
    url: string;
  }
};

type Move = {
  move: {
    name: string;
    url: string;
  }
};

type Ability = {
  ability: {
    name: string;
    url: string;
  }
};

interface PokemonData {
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

  useEffect(() => {
    if (id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data: PokemonData) => setPokemon(data))
        .catch((err) => console.error(err.message));
    };
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <button className="self-start text-lg" onClick={() => router.back()}>Back</button>
      <div className="flex justify-center">
        <Image
          src={pokemon.sprites.other['official-artwork'].front_shiny}
          alt={pokemon.name}
          width={300}
          height={300}
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
        <table>
          <tr>
              <th className="text-start">Weight</th>
              <td>{pokemon.weight}</td>
          </tr>
          <tr>
              <th className="text-start">Height</th>
              <td>{pokemon.height}</td>
          </tr>
          <tr>
              <th className="text-start">Types:</th>
              <td className="flex flex-wrap gap-1">
                {pokemon.types.map((type, id) => (
                  <span key={type.type.name} className="capitalize">{type.type.name}{id === pokemon.types.length - 1? '.': ','}</span>
                ))}
              </td>
          </tr>
          <tr>
              <th className="text-start">Abilities:</th>
              <td className="flex flex-wrap gap-1">
                {pokemon.abilities.map((ability, id) => (
                  <span key={ability.ability.name} className="capitalize">{ability.ability.name}{id === pokemon.abilities.length - 1? '.': ','}</span>
                ))}
              </td>
          </tr>
          <tr>
              <th className="text-start align-top">Moves:</th>
              <td className="flex flex-wrap gap-1">
                {pokemon.moves.map((move, id) => (
                  <span key={move.move.name} className="capitalize">{move.move.name}{id === pokemon.moves.length - 1? '.': ','}</span>
                ))}
              </td>
          </tr>
      </table>
      </div>
    </div>
  );
};
