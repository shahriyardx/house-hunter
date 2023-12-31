import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { API_BASE } from "../../../config"
import { ApiResponse } from "../../../types"
import { useQuery } from "react-query"
import { HousesResponse } from "./OwnerDashboard"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import OwnerDashboardLayout from "../../../components/layouts/dashboard.owner"
import Container from "../../../components/layouts/container"

type HouseInputType = {
  name: string
  address: string
  city: string
  room_size: string
  bedrooms: number
  bathrooms: number
  availability_date: string
  rent: number
  contact_number: string
  description: string
  image: FileList
}

type HouseInputPayload = {
  name: string
  address: string
  city: string
  room_size: string
  bedrooms: number
  bathrooms: number
  availability_date: string
  rent: number
  contact_number: string
  description: string
  image_url: string
}

const EditHouse = () => {
  const params = useParams()

  const { data } = useQuery<{ success: string; data: HousesResponse }>({
    queryKey: `owner_houses_${params.houseId as string}`,
    queryFn: () =>
      fetch(`${API_BASE}/owner/house/${params.houseId as string}`, {
        headers: {
          authorization: `Bearer ${
            localStorage.getItem("accessToken") as string
          }`,
        },
      }).then((response) => response.json()),
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HouseInputType>({})

  useEffect(() => {
    if (data && data.data) {
      const date = new Date(data.data.availability_date)
      const avail_date = `${date.getFullYear()}-${
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`
      }-${date.getDate()}`

      reset({
        ...data.data,
        availability_date: avail_date,
      })
    }
  }, [data, reset])

  const submitHandler = async (values: HouseInputType) => {
    let image_url
    if (values.image.length > 0) {
      const { image } = values
      const file = image[0]
      image_url = await uploadImage(file)

      if (!image_url) {
        return toast.error("Image uploading failed please try again")
      }
    }

    const finalData: HouseInputPayload = {
      ...values,
      image_url: image_url || (data?.data.image_url as string),
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      rent: Number(values.rent),
      availability_date: String(values.availability_date),
    }

    const response = await fetch(
      `${API_BASE}/owner/house/edit/${params.houseId as string}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${
            localStorage.getItem("accessToken") as string
          }`,
        },
        body: JSON.stringify(finalData),
      }
    )

    if (!response.ok) {
      return toast.error("Something went wrong")
    }

    const api_data = (await response.json()) as ApiResponse
    if (api_data.status === "success") {
      toast.success(api_data.message)
    } else {
      toast.error(api_data.message)
    }
  }

  const uploadImage = async (image: File) => {
    if (image) {
      const form = new FormData()
      form.append("image", image)

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=c7a97a9463c5ed67984ec122f6cbc4ad`,
        {
          method: "POST",
          body: form,
        }
      )

      if (!response.ok) {
        toast.error(
          "Something went wrong while uploading image, please select a different image or try again later"
        )
        return null
      }

      const data = (await response.json()) as { data: { url: string } }
      return data.data.url
    }
  }

  return (
    <OwnerDashboardLayout>
      <Container>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-1">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "name is required",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors?.name?.message}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                {...register("address", {
                  required: {
                    value: true,
                    message: "address is required",
                  },
                })}
              />

              <span className="text-sm text-red-500">
                {errors?.address?.message}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                {...register("city", {
                  required: {
                    value: true,
                    message: "city name is required",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors?.city?.message}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-1">
              <label>Room Size</label>
              <input
                type="text"
                placeholder="Room Size"
                {...register("room_size", {
                  required: {
                    value: true,
                    message: "room size is required",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors?.room_size?.message}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label>Berdooms</label>
              <input
                type="number"
                placeholder="Berdooms"
                {...register("bedrooms", {
                  required: {
                    value: true,
                    message: "bedrooms is required",
                  },
                  min: {
                    value: 1,
                    message: "minimum bedroom is 1",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors?.bedrooms?.message}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label>Bathrooms</label>
              <input
                type="number"
                placeholder="Bathrooms"
                {...register("bathrooms", {
                  required: {
                    value: true,
                    message: "bathrooms is required",
                  },
                  min: {
                    value: 1,
                    message: "minimum bathroom is 1",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors?.bathrooms?.message}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-1">
              <label>Availability Date</label>
              <input
                type="date"
                {...register("availability_date", {
                  required: {
                    value: true,
                    message: "date is required",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors?.availability_date?.message}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label>Rent per month ($)</label>
              <input
                type="number"
                placeholder="Rent Per Month"
                {...register("rent", {
                  required: {
                    value: true,
                    message: "rent is required",
                  },
                  min: {
                    value: 100,
                    message: "minumum rent is 100$",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors?.rent?.message}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label>Contact Number</label>
              <input
                type="text"
                placeholder="Contact Number"
                {...register("contact_number", {
                  required: {
                    value: true,
                    message: "contact number is required",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors?.contact_number?.message}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label>Description</label>
            <textarea
              rows={10}
              {...register("description", {
                required: {
                  value: true,
                  message: "description is required",
                },
              })}
            />
            <span className="text-sm text-red-500">
              {errors?.description?.message}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label>House Image</label>
            <input type="file" accept="image/*" {...register("image")} />
            <span className="text-sm text-red-500">
              {errors?.image?.message}
            </span>
          </div>

          <div>
            <button className="px-5 py-3 text-white bg-green-600 rounded-md">
              Update
            </button>
          </div>
        </form>
      </Container>
    </OwnerDashboardLayout>
  )
}

export default EditHouse
