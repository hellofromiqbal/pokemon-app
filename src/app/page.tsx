import Link from "next/link";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import Pagination from "@/components/Pagination/Pagination";
import { IoSearch } from "react-icons/io5";

interface Pokemon {
  name: string;
  url: string;
};

interface PokemonApiResponse {
  next: string;
  previous: string;
  results: Pokemon[];
};

const getData = async (): Promise<PokemonApiResponse | null> => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data: PokemonApiResponse = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  };
};

export default async function Home() {
  const data = await getData();

  if (!data) {
    return <div>Failed to load data</div>;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-semibold">Pokemon App</h1>
        <Link href={"/search"}>
          <IoSearch size={30}/>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2">
        {data.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <Pagination previous={data.previous} next={data.next}/>
    </div>
  );
};
