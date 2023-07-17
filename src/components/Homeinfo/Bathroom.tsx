import { BiBath } from "react-icons/bi"

const Bathroom = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-2 items-center">
      <BiBath className="text-2xl" />
      <span>{count}</span>
    </div>
  )
}

export default Bathroom
