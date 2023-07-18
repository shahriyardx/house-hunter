import { BiSearch } from "react-icons/bi"
import Container from "../components/layouts/container"
import Main from "../components/layouts/main"
import Homeinfo from "../components/Homeinfo/Homeinfo"
// @ts-expect-error(no type definition)
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"
import { useState } from "react"
import HousePaginator from "../components/HousePaginator"
import { Link } from "react-router-dom"

const Home = () => {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [currentPage, setCurrentPage] = useState(1)

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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores eum libero delectus magnam reiciendis atque obcaecati
              molestias, id labore veniam? Quis esse architecto ipsum, dolorum
              nostrum odit illum obcaecati magni.
            </p>

            <div className="flex items-center gap-3 mt-5">
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
                  max={100}
                  defaultValue={[0, 100]}
                  onInput={setPriceRange}
                />

                <div className="flex justify-between mt-3">
                  <span>{priceRange[0]}</span>
                  <span>{priceRange[1]}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span>City</span>
                <select>
                  <option value="mancester">Mancester</option>
                  <option value="mancester">Mancester</option>
                  <option value="mancester">Mancester</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span>Bedrooms</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="bedrooms" id="5_bed" value={5} />
                    <label htmlFor="5_bed">5 bedrooms</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="radio" name="bedrooms" id="6_bed" value={6} />
                    <label htmlFor="6_bed">6 bedrooms</label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span>Bathrooms</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="bathrooms"
                      id="5_bath"
                      value={5}
                    />
                    <label htmlFor="5_bath">5 bathrooms</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="bathrooms"
                      id="6_bath"
                      value={6}
                    />
                    <label htmlFor="6_bath">6 bathrooms</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-5">
              <Homeinfo />
              <Homeinfo />
              <Homeinfo />
            </div>

            <div className="mt-5">
              <HousePaginator
                pages={5}
                currentPage={currentPage}
                onChange={(value) => setCurrentPage(value)}
              />
            </div>
          </div>
        </Container>
      </section>
    </Main>
  )
}

export default Home
