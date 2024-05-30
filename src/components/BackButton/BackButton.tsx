import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button className="self-start text-lg" onClick={() => router.back()}>Back</button>
  )
};
