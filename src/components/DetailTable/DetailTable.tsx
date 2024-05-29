import { PokemonData } from "@/app/pokemon/[id]/page"

interface DetailTableProps {
  pokemon: PokemonData;
};

export default function DetailTable({ pokemon } : DetailTableProps) {
  return (
    <table className="border border-black">
      <tr className="border border-black">
          <th className="px-2 text-start border border-black">Weight</th>
          <td className="px-2">{pokemon.weight}</td>
      </tr>
      <tr className="border border-black">
          <th className="px-2 text-start border border-black">Height</th>
          <td className="px-2">{pokemon.height}</td>
      </tr>
      <tr className="border border-black">
          <th className="px-2 text-start border border-black">Types</th>
          <td className="px-2 flex flex-wrap gap-1">
            {pokemon.types.map((type, id) => (
              <span key={type.type.name} className="capitalize">{type.type.name}{id === pokemon.types.length - 1? '.': ','}</span>
            ))}
          </td>
      </tr>
      <tr className="border border-black">
          <th className="px-2 text-start border border-black">Abilities</th>
          <td className="px-2 flex flex-wrap gap-1">
            {pokemon.abilities.map((ability, id) => (
              <span key={ability.ability.name} className="capitalize">{ability.ability.name}{id === pokemon.abilities.length - 1? '.': ','}</span>
            ))}
          </td>
      </tr>
      <tr className="border border-black">
          <th className="px-2 text-start border border-black align-top">Moves</th>
          <td className="px-2 flex flex-wrap gap-1">
            {pokemon.moves.map((move, id) => (
              <span key={move.move.name} className="capitalize">{move.move.name}{id === pokemon.moves.length - 1? '.': ','}</span>
            ))}
          </td>
      </tr>
    </table>
  )
};
