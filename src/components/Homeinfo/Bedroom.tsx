import { TbBed } from "react-icons/tb"

const Bedroom = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-2 items-center">
      <TbBed className="text-3xl" />
      <span>{count}</span>
    </div>
  )
}

export default Bedroom
