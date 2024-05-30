import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();
  return (
    <button className="self-start text-lg" onClick={() => router.back()}>
      <IoArrowBack size={30}/>
    </button>
  )
};
