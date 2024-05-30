import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { collectionFormSchema } from "@/helpers/zodSchema";

interface CollectionFormProps {
  pokemonId: string;
  handleShowCollectionForm: () => void;
  setIsFavoritePokemon: (isFavorite: boolean) => void;
};

interface FormData {
  nickname: string;
  description: string;
};

export default function CollectionForm({ pokemonId, handleShowCollectionForm, setIsFavoritePokemon }: CollectionFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(collectionFormSchema)
  });

  const submitForm: SubmitHandler<FormData> = (data) => {
    const myFavPokemon = JSON.parse(localStorage.getItem('myFavPokemon') || '[]');
    const newFavorite = {
      id: pokemonId,
      nickname: data.nickname,
      description: data.description
    };
    myFavPokemon.push(newFavorite);
    localStorage.setItem('myFavPokemon', JSON.stringify(myFavPokemon));
    setIsFavoritePokemon(true);
    handleShowCollectionForm();
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center h-screen bg-black bg-opacity-30">
      <form
        className="p-4 flex flex-col gap-2 w-11/12 sm:w-2/3 lg:w-1/3 bg-white rounded-md relative"
        onSubmit={handleSubmit(submitForm)}
      >
        <button type="button" className="absolute top-4 right-4" onClick={handleShowCollectionForm}>
          <IoCloseCircleOutline size={30} />
        </button>
        <h3 className="text-center text-xl font-bold">Save Pokemon</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="nickname">Nickname:</label>
            <input
              id="nickname"
              type="text"
              placeholder="Enter nickname for your Pokemon!"
              className="border px-2 py-1"
              {...register('nickname')}
            />
            {errors.nickname && <p className="text-red-500">{errors.nickname.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              placeholder="Enter description for your Pokemon!"
              className="border px-2 py-1"
              {...register('description')}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
        </div>
        <button className="mt-4 py-1 bg-green-500 text-white text-center rounded-full">Save</button>
      </form>
    </div>
  );
};
