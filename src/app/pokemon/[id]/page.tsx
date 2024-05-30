'use client'

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "@/app/loading";
import BackButton from "@/components/BackButton/BackButton";
import CollectionForm from "@/components/CollectionForm/CollectionForm";
import DetailTable from "@/components/DetailTable/DetailTable";
import { notifySuccess } from "@/helpers/toaster";

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

export default function PokemonPage() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [isFavoritePokemon, setIsFavoritePokemon] = useState(false);
  const [showCollectionForm, setShowCollectionForm] = useState(false);

  const handleShowCollectionForm = () => {
    setShowCollectionForm((prev) => !prev);
  };

  useEffect(() => {
    if(id){
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data: PokemonData) => setPokemon(data))
        .catch((err) => console.error(err.message));
    };
  }, [id]);

  useEffect(() => {
    if(id){
      const myFavPokemon = JSON.parse(localStorage.getItem('myFavPokemon') || '[]');
      const isFavorite = myFavPokemon.some((favorite: any) => favorite.id === id);
      setIsFavoritePokemon(isFavorite);
    };
  }, [id]);

  const handleFavoriteClick = () => {
    if(id){
      const myFavPokemon = JSON.parse(localStorage.getItem('myFavPokemon') || '[]');
      if(isFavoritePokemon){
        const newFavPokemon = myFavPokemon.filter((favorite: any) => favorite.id !== id);
        localStorage.setItem('myFavPokemon', JSON.stringify(newFavPokemon));
        setIsFavoritePokemon(false);
        notifySuccess('Pokemon has been removed from favorites!');
      } else {
        setShowCollectionForm(true);
      };
    };
  };

  if(!pokemon){
    return <LoadingPage />;
  };

  return (
    <div className="p-4 lg:px-0 flex flex-col gap-4 relative">
      {showCollectionForm && (
        <CollectionForm
          pokemonId={id}
          handleShowCollectionForm={handleShowCollectionForm}
          setIsFavoritePokemon={setIsFavoritePokemon}
        />
      )}
      <div className='flex justify-between items-center'>
        <BackButton />
        <h2 className='font-bold text-xl'>Pokemon Details</h2>
      </div>
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
