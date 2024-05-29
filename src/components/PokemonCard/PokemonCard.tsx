import Image from "next/image";
import Link from "next/link";

type PokemonCardProps = {
  pokemon: {
    name: string;
    url: string;
  };
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const splittedPokemonUrl = pokemon.url.split('/');
  const pokemonId = splittedPokemonUrl[splittedPokemonUrl.length - 2];

  return (
    <Link href={`/pokemon/${pokemonId}`} className="flex py-2 border rounded-md">
      <div className="w-1/3 flex justify-center items-center">
        <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt="pokemonImg" width={70} height={70}/>
      </div>
      <div className="w-2/3 flex flex-col justify-center">
        <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
      </div>
    </Link>
  );
};
