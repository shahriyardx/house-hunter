import { useQuery } from "react-query"
import CustomerHeader from "../../../components/dashboard/CustomerHeader"
import { ApiResponse } from "../../../types"
import { API_BASE } from "../../../config"
import Container from "../../../components/layouts/container"
import toast from "react-hot-toast"

const OwnerBookings = () => {
  const { data, refetch } = useQuery<
    ApiResponse & {
      data: { _id: string; renter: { name: string; email: string } }[]
    }
  >({
    queryKey: "bookings",
    queryFn: () =>
      fetch(`${API_BASE}/owner/bookings`, {
        headers: {
          authorization: `Bearer ${
            localStorage.getItem("accessToken") as string
          }`,
        },
      }).then((response) => response.json()),
  })

  const rents = data ? data.data : []

  const deleteBooking = (bookid: string) => {
    fetch(`${API_BASE}/owner/bookings/${bookid}`, {
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
        <h1 className="py-10 text-4xl font-extrabold text-center">Bookings</h1>
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
                <td className="px-3 py-2 text-left">{rent.renter.name}</td>
                <td className="px-3 py-2 text-left">{rent.renter.email}</td>
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

export default OwnerBookings
