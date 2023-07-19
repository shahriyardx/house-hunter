import { useQuery } from "react-query"
import Container from "../../../components/layouts/container"
import OwnerDashboardLayout from "../../../components/layouts/dashboard.owner"
import { API_BASE } from "../../../config"
import { Link } from "react-router-dom"

type HousesResponse = {
  _id: string
  name: string
  address: string
  city: string
  bedrooms: number
  bathrooms: number
  rent: number
  room_size: string
  contact_number: string
  image_url: string
  availability_date: string
}[]

const OwnerDashboard = () => {
  const { data, isLoading } = useQuery<HousesResponse>({
    queryKey: "owner_houses",
    queryFn: () =>
      fetch(`${API_BASE}/owner/house/all`, {
        headers: {
          authorization: `Bearer ${
            localStorage.getItem("accessToken") as string
          }`,
        },
      }).then((response) => response.json()),
  })

  console.log(data, isLoading)

  return (
    <OwnerDashboardLayout>
      <Container>
        <div className="grid grid-cols-2 gap-5">
          <div className="p-10 border-2 rounded-md shadow-md">
            Total House: 1
          </div>

          <div className="p-10 border-2 rounded-md shadow-md">Bookings: 1</div>
        </div>

        <div className="mt-10">
          <table className="w-full">
            <thead className="text-white bg-black">
              <tr>
                <th className="px-3 py-2 text-left">SL</th>
                <th className="px-3 py-2 text-left">Image</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Rent</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                <>
                  {data.map((house, index) => (
                    <tr key={index}>
                      <td className="w-[2%] px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">
                        <img
                          src={house.image_url}
                          className="w-10 rounded-full aspect-square"
                        />
                      </td>
                      <td className="px-3 py-2 text-left">{house.name}</td>
                      <td className="px-3 py-2 text-left">{house.rent}</td>
                      <td className="px-3 py-2 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            className="px-3 py-2 text-white bg-yellow-600 rounded-md"
                            to={`/dashboard/owner/house/edit/${house._id}`}
                          >
                            Edit
                          </Link>
                          <button className="px-3 py-2 text-white bg-red-600 rounded-md">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={4} className="px-3 py-2">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </OwnerDashboardLayout>
  )
}

export default OwnerDashboard
