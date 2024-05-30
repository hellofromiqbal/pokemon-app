import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();
  return (
    <button className="flex items-center gap-2 self-start text-lg font-semibold" onClick={() => router.back()}>
      <IoArrowBack size={20}/>
      <span>Back</span>
    </button>
  )
};
