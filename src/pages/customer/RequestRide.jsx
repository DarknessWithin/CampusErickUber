import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function RequestRide() {

    const navigate = useNavigate();

    const customer =
        JSON.parse(localStorage.getItem("customer"));

    const [pickupLocation, setPickupLocation] =
        useState("");

    const [destination, setDestination] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const requestRide = async () => {

        if (
            !pickupLocation.trim() ||
            !destination.trim()
        ) {
            alert("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const res = await api.post(
                "/ride/request",
                {
                    customerId: customer.userId,
                    pickupLocation,
                    destination
                }
            );

            alert(
                `Ride #${res.data.rideId} created`
            );

            navigate("/customer/dashboard");

        } catch {

            alert("Ride request failed");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div
            className="
                min-h-screen
                bg-slate-950
                text-white
                flex
                justify-center
                items-center
                p-6
            "
        >

            <div
                className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-8
                    w-full
                    max-w-lg
                "
            >

                <h1
                    className="
                        text-4xl
                        font-bold
                        mb-8
                    "
                >
                    Request Ride
                </h1>

                <div className="space-y-4">

                    <input
                        className="
                            w-full
                            p-3
                            rounded-xl
                            bg-slate-800
                        "
                        placeholder="Pickup Location"
                        value={pickupLocation}
                        onChange={(e) =>
                            setPickupLocation(
                                e.target.value
                            )
                        }
                    />

                    <input
                        className="
                            w-full
                            p-3
                            rounded-xl
                            bg-slate-800
                        "
                        placeholder="Destination"
                        value={destination}
                        onChange={(e) =>
                            setDestination(
                                e.target.value
                            )
                        }
                    />

                    <button
                        disabled={loading}
                        onClick={requestRide}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            py-3
                            rounded-xl
                            font-semibold
                            disabled:opacity-50
                        "
                    >
                        {
                            loading
                                ? "Creating Ride..."
                                : "Request Ride"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}