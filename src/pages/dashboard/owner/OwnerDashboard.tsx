import Container from "../../../components/layouts/container"
import OwnerDashboardLayout from "../../../components/layouts/dashboard.owner"

const OwnerDashboard = () => {
  return (
    <OwnerDashboardLayout>
      <Container>
        <div className="grid grid-cols-2 gap-5">
          <div className="p-10 border-2 rounded-md shadow-md">
            Total House: 1
          </div>

          <div className="p-10 border-2 rounded-md shadow-md">Bookings: 1</div>
        </div>
      </Container>
    </OwnerDashboardLayout>
  )
}

export default OwnerDashboard
