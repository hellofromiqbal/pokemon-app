import Link from "next/link";

type PokemonCardProps = {
  previous: string;
  next: string;
};

export default function Pagination({ previous, next } : PokemonCardProps) {
  return (
    <div className="flex">
      {previous && <Link href={previous} className="bg-blue-700 text-white px-3 py-2 rounded-md mr-auto">Prev</Link>}
      {next && <Link href={next} className="bg-blue-700 text-white px-3 py-2 rounded-md ml-auto">Next</Link>}
    </div>
  )
};
