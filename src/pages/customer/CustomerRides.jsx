import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import {connectWebSocket} from "../../services/websocket.js";

export default function CustomerRides() {

    const navigate = useNavigate();

    const customer =
        JSON.parse(
            localStorage.getItem("customer")
        );

    const [rides, setRides] =
        useState([]);

    const loadRides = async () => {

        try {

            const res =
                await api.get(
                    `/customer/${customer.userId}/rides`
                );

            setRides(res.data);

        } catch (err) {

            console.error(err);

            alert("Failed to load rides");
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

    const getStatusColor = (status) => {

        switch (status) {

            case "REQUESTED":
                return "bg-yellow-600";

            case "ACCEPTED":
                return "bg-blue-600";

            case "IN_PROGRESS":
                return "bg-purple-600";

            case "COMPLETED":
                return "bg-green-600";

            case "CANCELLED":
                return "bg-red-600";

            default:
                return "bg-slate-600";
        }
    };

    return (

        <div
            className="
                min-h-screen
                bg-slate-950
                text-white
                p-8
            "
        >

            <div
                className="
                    flex
                    justify-between
                    items-center
                    mb-8
                "
            >

                <h1
                    className="
                        text-4xl
                        font-bold
                    "
                >
                    My Rides
                </h1>

                <button
                    onClick={() =>
                        navigate("/customer/dashboard")
                    }
                    className="
                        bg-slate-800
                        hover:bg-slate-700
                        px-5
                        py-2
                        rounded-xl
                    "
                >
                    Back
                </button>

            </div>

            {
                rides.length === 0 && (

                    <div
                        className="
                            bg-slate-900
                            rounded-2xl
                            p-10
                            text-center
                        "
                    >
                        No rides found.
                    </div>

                )
            }

            <div className="space-y-5">

                {
                    rides.map((ride) => (
                    <div
                        key={ride.rideId}
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-6
                        "
                    >

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                            "
                        >

                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                "
                            >
                                Ride #{ride.rideId}

                                {
                                    ride.status === "IN_PROGRESS" && (
                                        <span
                                            className="
                ml-3
                text-green-400
                animate-pulse
                text-sm
            "
                                        >
            LIVE
        </span>
                                    )
                                }
                            </h2>

                            <span
                                className={`
                                    px-4
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-semibold
                                    ${getStatusColor(
                                    ride.status
                                )}
                                `}
                            >
                                {ride.status}
                            </span>

                        </div>

                        <div className="mt-5 space-y-2">

                            <p>
                                <strong>
                                    Pickup:
                                </strong>
                                {" "}
                                {ride.pickupLocation}
                            </p>

                            <p>
                                <strong>
                                    Destination:
                                </strong>
                                {" "}
                                {ride.destination}
                            </p>

                            {
                                ride.driver && (

                                    <p>
                                        <strong>
                                            Driver:
                                        </strong>
                                        {" "}
                                        {ride.driver.name}
                                    </p>

                                )
                            }

                        </div>

                        {
                            ride.status ===
                            "COMPLETED" &&
                            (

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/customer/rate/${ride.rideId}`
                                        )
                                    }
                                    className="
                                        mt-5
                                        bg-green-600
                                        hover:bg-green-700
                                        px-5
                                        py-2
                                        rounded-xl
                                        font-semibold
                                    "
                                >
                                    Rate Ride
                                </button>

                            )}

                    </div>

                ))}

            </div>

        </div>
    );
}