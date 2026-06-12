import { useEffect, useState } from "react";
import api from "../../api/api";
import {
    connectWebSocket
}
    from "../../services/websocket";
export default function DriverRides() {

    const driver =
        JSON.parse(
            localStorage.getItem("driver")
        );

    const [rides, setRides] =
        useState([]);

    const loadRides = async () => {

        try {

            const res =
                await api.get(
                    `/driver/${driver.id}/rides`
                );

            setRides(res.data);

        } catch (err) {

            console.error(err);
        }
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

    const startRide = async (rideId) => {

        try {

            await api.post(
                `/ride/${rideId}/start`
            );

            loadRides();

        } catch (err) {

            alert("Cannot start ride");

            console.error(err);
        }
    };

    const completeRide = async (rideId) => {

        try {

            await api.post(
                `/ride/${rideId}/complete`
            );

            loadRides();

        } catch (err) {

            alert("Cannot complete ride");

            console.error(err);
        }
    };

    const cancelRide = async (rideId) => {

        try {

            await api.post(
                `/ride/${rideId}/cancel`
            );

            loadRides();

        } catch (err) {

            alert("Cannot cancel ride");

            console.error(err);
        }
    };

    return (

        <div className="min-h-screen bg-slate-950 text-white p-8">

            <h1 className="text-4xl font-bold mb-8">
                My Rides
            </h1>

            <div className="space-y-6">

                {rides.map((ride) => (

                    <div
                        key={ride.rideId}
                        className="
                            bg-slate-900
                            rounded-2xl
                            p-6
                            border
                            border-slate-800
                        "
                    >

                        <div className="flex justify-between">

                            <h2 className="text-xl font-semibold">
                                Ride #{ride.rideId}
                            </h2>

                            <span className="font-bold">
                                {ride.status}
                            </span>

                        </div>

                        <div className="mt-4 space-y-2">

                            <p>
                                Pickup:
                                {" "}
                                {ride.pickupLocation}
                            </p>

                            <p>
                                Destination:
                                {" "}
                                {ride.destination}
                            </p>

                        </div>

                        <div className="flex gap-3 mt-5">

                            {ride.status === "ACCEPTED" && (

                                <button
                                    onClick={() =>
                                        startRide(
                                            ride.rideId
                                        )
                                    }
                                    className="
                                        bg-green-600
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Start Ride
                                </button>

                            )}

                            {ride.status === "IN_PROGRESS" && (

                                <button
                                    onClick={() =>
                                        completeRide(
                                            ride.rideId
                                        )
                                    }
                                    className="
                                        bg-blue-600
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Complete Ride
                                </button>

                            )}

                            {(ride.status === "ACCEPTED" ||
                                ride.status === "IN_PROGRESS") && (

                                <button
                                    onClick={() =>
                                        cancelRide(
                                            ride.rideId
                                        )
                                    }
                                    className="
                                        bg-red-600
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Cancel Ride
                                </button>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}