import PokemonCard from "@/components/PokemonCard/PokemonCard";
import Pagination from "@/components/Pagination/Pagination";

type Pokemon = {
  name: string;
  url: string;
};

type PokemonApiResponse = {
  next: string;
  previous: string;
  results: Pokemon[];
};

const getData = async (): Promise<PokemonApiResponse | null> => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20', { cache: 'no-store' });
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
    <div className="p-4 flex flex-col gap-4">
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2">
        {data.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <Pagination previous={data.previous} next={data.next}/>
    </div>
  );
};
