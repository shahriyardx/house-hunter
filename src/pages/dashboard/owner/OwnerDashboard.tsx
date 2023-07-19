import { useQuery } from "react-query"
import Container from "../../../components/layouts/container"
import OwnerDashboardLayout from "../../../components/layouts/dashboard.owner"
import { API_BASE } from "../../../config"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { ApiResponse } from "../../../types"

export type HousesResponse = {
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
  description: string
}

const OwnerDashboard = () => {
  const { data, refetch } = useQuery<HousesResponse[]>({
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

  const deleteHouse = (id: string) => {
    const con = confirm("Are you sure?")
    if (!con) return

    fetch(`${API_BASE}/owner/house/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${
          localStorage.getItem("accessToken") as string
        }`,
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        if (data.status === "success") {
          void refetch()
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      })
      .catch(() => toast.error("Something went wrong"))
  }

  return (
    <OwnerDashboardLayout>
      <Container>
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
                          <button
                            onClick={() => deleteHouse(house._id)}
                            className="px-3 py-2 text-white bg-red-600 rounded-md"
                          >
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
