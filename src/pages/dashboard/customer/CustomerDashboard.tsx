import { useQuery } from "react-query"
import CustomerHeader from "../../../components/dashboard/CustomerHeader"
import { ApiResponse } from "../../../types"
import { HousesResponse } from "../owner/OwnerDashboard"
import { API_BASE } from "../../../config"
import Container from "../../../components/layouts/container"
import toast from "react-hot-toast"

const CustomerDashboard = () => {
  const { data, refetch } = useQuery<
    ApiResponse & { data: { _id: string; house: HousesResponse }[] }
  >({
    queryKey: "bookings",
    queryFn: () =>
      fetch(`${API_BASE}/renter/book`, {
        headers: {
          authorization: `Bearer ${
            localStorage.getItem("accessToken") as string
          }`,
        },
      }).then((response) => response.json()),
  })

  const rents = data ? data.data : []

  const deleteBooking = (bookid: string) => {
    fetch(`${API_BASE}/renter/book/${bookid}`, {
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
          toast.success(data.message)
          void refetch()
        } else {
          toast.error(data.message)
        }
      })
      .catch(() => toast.error("Something went wrong"))
  }

  return (
    <div>
      <CustomerHeader />
      <Container className="my-10">
        <h1 className="py-10 text-4xl font-extrabold text-center">
          My Bookings
        </h1>
        <table className="w-full">
          <thead className="text-white bg-black">
            <tr>
              <th className="px-3 py-2 text-left">SL</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Rent</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {rents.map((rent, index) => (
              <tr key={rent._id}>
                <td className="px-3 py-2 text-left">{index + 1}</td>
                <td className="px-3 py-2 text-left">{rent.house.name}</td>
                <td className="px-3 py-2 text-left">
                  ${rent.house.rent}/month
                </td>
                <td className="px-3 py-2 text-left">
                  <button
                    onClick={() => deleteBooking(rent._id)}
                    className="px-3 py-2 text-white bg-red-500 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  )
}

export default CustomerDashboard
