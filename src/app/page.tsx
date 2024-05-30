'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import Pagination from "@/components/Pagination/Pagination";
import LoadingPage from "./loading";
import ErrorPage from "./error";
import Custom404Page from "./404";
import { IoSearch } from "react-icons/io5";
import { MdOutlineCatchingPokemon } from "react-icons/md";

interface Pokemon {
  name: string;
  url: string;
};

interface PokemonApiResponse {
  next: string;
  previous: string;
  results: Pokemon[];
};

export default function Home() {
  const [data, setData] = useState<PokemonApiResponse | null>(null);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePagination = (newUrl: string) => {
    setUrl(newUrl);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if(!response.ok){
          throw new Error(`Error: ${response.status}`);
        };
        const data: PokemonApiResponse = await response.json();
        setData(data);
      } catch(error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      };
    };
    fetchData();
  }, [url]);

  if(loading || !data){
    return <LoadingPage/>;
  };

  if(error){
    return <ErrorPage/>;
  };

  return (
    <div className="p-4 lg:px-0 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-semibold">Pokemon App</h1>
        <div className="flex gap-4">
          <Link href={"/favorite"}>
            <MdOutlineCatchingPokemon size={30}/>
          </Link>
          <Link href={"/search"}>
            <IoSearch size={30}/>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2">
        {data.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon}/>
        ))}
      </div>
      <Pagination previous={data.previous} next={data.next} handlePagination={handlePagination}/>
    </div>
  );
};
