import { HousesResponse } from "../../pages/dashboard/owner/OwnerDashboard"
import useUser from "../hooks/useUser"
import Bathroom from "./Bathroom"
import Bedroom from "./Bedroom"
import Price from "./Price"

const Homeinfo = ({ house }: { house: HousesResponse }) => {
  const { decodedToken } = useUser()

  return (
    <article className="grid grid-cols-[300px,auto] gap-7 p-7 border-2 rounded-2xl">
      <div>
        <img
          src={house.image_url}
          className="object-cover w-full rounded-xl aspect-square"
          alt=""
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold">{house.name}</h3>
        <p className="mt-2">{house.description}</p>

        <div className="mt-auto">
          <div className="flex items-center gap-4">
            <Price price={house.rent} />
            <Bedroom count={house.bedrooms} />
            <Bathroom count={house.bathrooms} />
          </div>

          <div>
            {decodedToken?.role === "customer" && (
              <button className="px-5 py-3 mt-3 text-white bg-black rounded-md">
                Rent Now
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default Homeinfo
