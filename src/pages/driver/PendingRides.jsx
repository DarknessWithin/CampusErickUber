import { useEffect,useState } from "react";
import api from "../../api/api";
import {
    connectWebSocket
}
    from "../../services/websocket";
export default function PendingRides() {

    const driver =
        JSON.parse(localStorage.getItem("driver"));

    const [rides,setRides] =
        useState([]);

    const loadRides = async () => {

        const res =
            await api.get("/ride/pending");

        setRides(res.data);
    };
    useEffect(() => {

        loadRides();

        const ws =
            connectWebSocket(() => {

                loadRides();
            });

        return () => {

            ws?.deactivate();
        };

    }, []);
    const acceptRide = async (rideId) => {

        await api.post(
            `/ride/${rideId}/accept/${driver.id}`
        );

        loadRides();
    };

    return (
        <div className="p-8 text-white">

            <h1 className="text-4xl font-bold mb-8">
                Pending Rides
            </h1>

            <div className="space-y-4">

                {rides.map((ride) => (

                    <div
                        key={ride.rideId}
                        className="
                            bg-slate-900
                            p-6
                            rounded-xl
                        "
                    >

                        <h2>
                            Ride #{ride.rideId}
                        </h2>

                        <p>
                            Pickup:
                            {ride.pickupLocation}
                        </p>

                        <p>
                            Destination:
                            {ride.destination}
                        </p>

                        <button
                            onClick={() =>
                                acceptRide(
                                    ride.rideId
                                )
                            }
                            className="
                                mt-3
                                bg-green-600
                                px-4
                                py-2
                                rounded-lg
                            "
                        >
                            Accept Ride
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}