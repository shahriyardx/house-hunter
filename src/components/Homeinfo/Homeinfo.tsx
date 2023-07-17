import Bathroom from "./Bathroom"
import Bedroom from "./Bedroom"
import Price from "./Price"

const Homeinfo = () => {
  return (
    <article className="grid grid-cols-[300px,auto] gap-7 p-7 border-2 rounded-2xl">
      <div>
        <img
          src="https://picsum.photos/500/900"
          className="rounded-xl w-full aspect-square object-cover"
          alt=""
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold">
          Old horror house with a torture room
        </h3>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia iure
          laborum, est earum natus quia tenetur voluptatibus vero, nobis
          suscipit vitae illo optio illum, quisquam eaque adipisci non sapiente
          fugiat.
        </p>

        <div className="mt-auto">
          <div className="flex gap-4 items-center">
            <Price price={500} />
            <Bedroom count={2} />
            <Bathroom count={1} />
          </div>

          <div>
            <button className="px-5 py-3 bg-black text-white rounded-md mt-3">
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Homeinfo
