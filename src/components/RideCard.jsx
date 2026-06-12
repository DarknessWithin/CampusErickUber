import StatusBadge
    from "./StatusBadge.jsx";

export default function RideCard({
                                     ride
                                 }) {

    return (
        <div
            className="
      bg-white
      p-5
      rounded-2xl
      shadow-md
      border
      "
        >

            <div className="
      flex
      justify-between
      ">
                <h3 className="font-bold">
                    Ride #{ride.rideId}
                </h3>

                <StatusBadge
                    status={ride.status}
                />
            </div>

            <p className="mt-4">
                📍 {ride.pickupLocation}
            </p>

            <p>
                🏁 {ride.destination}
            </p>

        </div>
    );
}