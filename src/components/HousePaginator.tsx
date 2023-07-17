type Props = {
  pages: number
  currentPage: number
  onChange?: (value: number) => void
}

const HousePaginator = ({ pages, currentPage, onChange }: Props) => {
  const pagesNumber = Array.from({ length: pages }, (_, i) => i + 1)

  const callback = (value: number) => {
    if (onChange) onChange(value)
  }

  return (
    <div className="flex items-center gap-3">
      {pagesNumber.map((item) => (
        <button
          key={item}
          onClick={() => callback(item)}
          className={`w-12 h-12 text-white bg-black hover:bg-zinc-500 rounded-full ${
            currentPage === item ? "bg-zinc-500" : ""
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default HousePaginator
