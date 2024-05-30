export default function CollectionForm() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-4 flex flex-col gap-4 bg-white">
        <div>
          <label htmlFor="nickname">Nickname:</label>
          <input
            id='nickname'
            type="text"
            placeholder='Enter nickname for your Pokemon!'
          />
        </div>
        <div>
          <label htmlFor="nickname">Description:</label>
          <input
            id='nickname'
            type="text"
            placeholder='Enter description for your Pokemon!'
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  )
};
