import { BiLoaderAlt, BiSearch } from "react-icons/bi"
import Container from "../components/layouts/container"
import Main from "../components/layouts/main"
import Homeinfo from "../components/Homeinfo/Homeinfo"
// @ts-expect-error(no type definition)
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"
import { useEffect, useState } from "react"
import HousePaginator from "../components/HousePaginator"
import { Link } from "react-router-dom"
import useUser from "../components/hooks/useUser"
import { useQuery } from "react-query"
import { ApiResponse } from "../types"
import { HousesResponse } from "./dashboard/owner/OwnerDashboard"
import { API_BASE } from "../config"

const Home = () => {
  const { decodedToken } = useUser()

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  const { data, isLoading } = useQuery<
    ApiResponse & { data: { houses: HousesResponse[]; totalHouses: number } }
  >({
    queryKey: ["houses", searchQuery, currentPage],
    queryFn: () =>
      fetch(`${API_BASE}/houses?query=${searchQuery}&page=${currentPage}`).then(
        (response) => response.json()
      ),
  })
  const houses = data ? data.data.houses : []
  const cities = [...new Set(houses.map((house) => house.city))]
  const bedrooms = [...new Set(houses.map((house) => house.bedrooms))]
  const bathrooms = [...new Set(houses.map((house) => house.bathrooms))]

  const [selectedCity, setSelectedCity] = useState<string>()
  const [selectedBedCount, setSelectedBedCount] = useState<number>()
  const [selectedBathCount, setSelectedBathCount] = useState<number>()

  const cityFiltertedHouses = selectedCity
    ? houses.filter((house) => house.city == selectedCity)
    : houses

  const bedFiltertedHouses = selectedBedCount
    ? cityFiltertedHouses.filter((house) => house.bedrooms == selectedBedCount)
    : cityFiltertedHouses

  const bathFiltertedHouses = selectedBathCount
    ? bedFiltertedHouses.filter((house) => house.bathrooms == selectedBathCount)
    : bedFiltertedHouses

  const maxPrice = Math.max(...bathFiltertedHouses.map((house) => house.rent))
  const [priceRange, setPriceRange] = useState([0, isLoading ? 0 : maxPrice])

  const housesToShow = bathFiltertedHouses.filter(
    (houses) => houses.rent >= priceRange[0] && houses.rent <= priceRange[1]
  )

  const totalPages = Math.ceil((data ? data.data.totalHouses : 10) / perPage)

  useEffect(() => {
    setPriceRange([0, maxPrice])
  }, [maxPrice])

  return (
    <Main>
      <section>
        <Container className="grid grid-cols-2 gap-5">
          <div className="py-32">
            <h1 className="text-6xl font-bold">
              Find a new place where you will live
            </h1>
          </div>
          <div className="flex flex-col justify-center">
            <p>
              "Find your perfect home with ease on our house renting website.
              Discover a wide range of rental properties to suit your lifestyle
              and budget, from cozy apartments to spacious family homes. Our
              user-friendly platform allows you to search and filter through a
              vast selection of properties, with detailed descriptions and
              high-quality images to help you make an informed decision. With
              our secure and hassle-free rental process, you can relax knowing
              that we prioritize your safety and satisfaction. Whether you're a
              student, young professional, or family, we have something for
              everyone. Join our community and start your journey to your dream
              home today!
            </p>

            <div className="flex items-center gap-3 mt-5">
              {decodedToken ? (
                <Link
                  to={`/dashboard/${decodedToken.role}`}
                  className="px-5 py-3 font-semibold text-white bg-black rounded-md"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="login"
                    className="px-5 py-3 font-semibold text-white bg-black rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register?role=owner"
                    className="px-5 py-3 rounded-md font-semibold border-[3px]"
                  >
                    Become owner
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-5 mt-20">
        <Container>
          <div className="flex items-center px-5 py-3 border-2 rounded-full ">
            <BiSearch className="text-2xl peer-focus:hidden" />
            <input
              type="text"
              className="w-full text-lg border-0 outline-none focus:ring-0 peer"
              placeholder="Search houses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Container>
      </section>

      <section className="mt-10">
        <Container className="grid grid-cols-[300px,auto] gap-5">
          <div>
            <h4 className="text-lg font-semibold">Filters</h4>
            <div className="flex flex-col gap-5 mt-5">
              <div>
                <span>Price</span>
                <RangeSlider
                  className="mt-2"
                  min={0}
                  max={isLoading ? 100 : maxPrice}
                  defaultValue={priceRange}
                  onInput={setPriceRange}
                />

                <div className="flex justify-between mt-3">
                  <span>{priceRange[0]}</span>
                  <span>{priceRange[1]}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span>City</span>
                <select onChange={(e) => setSelectedCity(e.target.value)}>
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span>Bedrooms</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="bedrooms"
                      id="nobed"
                      value=""
                      onChange={() => setSelectedBedCount(0)}
                    />
                    <label htmlFor="nobed">No filter</label>
                  </div>
                  {bedrooms.map((room, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bedrooms"
                        id={String(index) + "bed"}
                        value={room}
                        onChange={(e) =>
                          setSelectedBedCount(Number(e.target.value))
                        }
                      />
                      <label htmlFor={String(index) + "bed"}>
                        {room} bedrooms
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span>Bathrooms</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="bathrooms"
                      id="nobath"
                      value=""
                      onChange={() => setSelectedBathCount(0)}
                    />
                    <label htmlFor="nobath">No filter</label>
                  </div>

                  {bathrooms.map((room, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bathrooms"
                        id={String(index) + "bath"}
                        value={room}
                        onChange={(e) =>
                          setSelectedBathCount(Number(e.target.value))
                        }
                      />
                      <label htmlFor={String(index) + "bath"}>
                        {room} bathrooms
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            {isLoading && (
              <div className="flex items-center justify-center gap-3 py-10">
                <BiLoaderAlt className="text-4xl animate-spin" />
                <span>Loading</span>
              </div>
            )}
            <div className="grid grid-cols-1 gap-5">
              {housesToShow.map((house) => (
                <Homeinfo house={house} key={house._id} />
              ))}
            </div>

            {!isLoading && data && data.data.totalHouses > perPage && (
              <div className="mt-5">
                <HousePaginator
                  pages={totalPages}
                  currentPage={currentPage}
                  onChange={(value) => setCurrentPage(value)}
                />
              </div>
            )}
          </div>
        </Container>
      </section>
    </Main>
  )
}

export default Home
