import { CiMoneyCheck1 } from "react-icons/ci"

const Price = ({ price }: { price: number }) => {
  return (
    <div className="flex gap-2 items-center">
      <CiMoneyCheck1 className="text-3xl" />
      <span>$ {price}</span>
    </div>
  )
}

export default Price
