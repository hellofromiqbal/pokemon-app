import { IoCloseCircleOutline } from "react-icons/io5";

export default function CollectionForm() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center h-screen bg-black bg-opacity-30">
      <form className="p-4 flex flex-col gap-2 w-11/12 sm:w-2/3 lg:w-1/3 bg-white rounded-md relative">
        <button className="absolute top-4 right-4">
          <IoCloseCircleOutline size={30}/>
        </button>
        <h3 className="text-center text-xl font-bold">Save Pokemon</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="nickname">Nickname:</label>
            <input
              id='nickname'
              type="text"
              placeholder='Enter nickname for your Pokemon!'
              className="border px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="nickname">Description:</label>
            <input
              id='nickname'
              type="text"
              placeholder='Enter description for your Pokemon!'
              className="border px-2 py-1"
            />
          </div>
        </div>
        <button className="mt-4 py-1 bg-green-500 text-white text-center rounded-full">Save</button>
      </form>
    </div>
  )
};
