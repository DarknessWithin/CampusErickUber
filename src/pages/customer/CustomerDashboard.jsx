import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import StatCard from "../../components/StatCard";
import {
    connectWebSocket,
} from "../../services/websocket";

export default function CustomerDashboard() {

    const navigate = useNavigate();

    const customer = JSON.parse(
        localStorage.getItem("customer")
    );

    const [dashboard, setDashboard] =
        useState(null);

    const [latestRide, setLatestRide] =
        useState(null);
    const [loading, setLoading] = useState(true);
    const loadDashboard = async () => {

        try {

            const res =
                await api.get(
                    `/customer/${customer.userId}/dashboard`
                );

            console.log(
                "SETTING DASHBOARD",
                res.data
            );

            setDashboard(res.data);
            setLoading(false);

        } catch (err) {

            console.error(err);
        }
    };

    const loadRides = async () => {

        try {

            console.log("LOADING RIDES");

            const res =
                await api.get(
                    `/customer/${customer.userId}/rides`
                );

            console.log(
                "RIDES RESPONSE",
                res.data
            );

            if (res.data.length > 0) {

                const latest =
                    res.data[
                    res.data.length - 1
                        ];

                console.log(
                    "SETTING RIDE",
                    latest
                );

                setLatestRide({
                    ...latest
                });
            }

        } catch (err) {

            console.error(err);
        }
    };
    useEffect(() => {

        loadDashboard();
        loadRides();

        const ws =
            connectWebSocket(() => {

                loadDashboard();
                loadRides();
            });

        return () => {

            ws?.deactivate();
        };

    }, []);

    useEffect(() => {

        console.log(
            "latestRide CHANGED",
            latestRide
        );

    }, [latestRide]);

    useEffect(() => {

        console.log(
            "dashboard CHANGED",
            dashboard
        );

    }, [dashboard]);

    const logout = () => {

        localStorage.removeItem("customer");

        navigate("/");
    };
    if (loading) {

        return (

            <div
                className="
                min-h-screen
                bg-slate-950
                text-white
                flex
                justify-center
                items-center
                text-2xl
            "
            >
                Loading...
            </div>

        );
    }
    return (

        <div className="min-h-screen bg-slate-950 text-white p-8">

            <div className="flex justify-between items-center flex-wrap gap-4">

                <div>

                    <h1 className="text-4xl font-bold">
                        Welcome, {customer?.name}
                    </h1>

                    <p className="text-slate-400 mt-2">
                        {customer?.email}
                    </p>

                </div>

                <button
                    onClick={logout}
                    className="
                        bg-red-600
                        hover:bg-red-700
                        px-5
                        py-2
                        rounded-xl
                    "
                >
                    Logout
                </button>

            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-10">

                <StatCard
                    title="Total Rides"
                    value={
                        dashboard?.totalRides ?? 0
                    }
                />

                <StatCard
                    title="Completed"
                    value={
                        dashboard?.completedRides ?? 0
                    }
                />

                <StatCard
                    title="Active"
                    value={
                        dashboard?.activeRides ?? 0
                    }
                />

                <StatCard
                    title="Cancelled"
                    value={
                        dashboard?.cancelledRides ?? 0
                    }
                />

            </div>

            <div className="mt-10 flex gap-4 flex-wrap">

                <button
                    onClick={() =>
                        navigate(
                            "/customer/request"
                        )
                    }
                    className="
                        bg-blue-600
                        hover:bg-blue-700
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                    "
                >
                    Request Ride
                </button>

                <button
                    onClick={() =>
                        navigate(
                            "/customer/rides"
                        )
                    }
                    className="
                        bg-slate-800
                        hover:bg-slate-700
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                    "
                >
                    My Rides
                </button>

            </div>

            <div
                className="
                    mt-10
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                "
            >

                <h2 className="text-2xl font-bold mb-4">
                    Latest Ride
                </h2>

                {
                    latestRide ? (

                        <div className="space-y-2">

                            <p>
                                <strong>Ride ID:</strong>{" "}
                                {latestRide.rideId}
                            </p>

                            <p>
                                <strong>Pickup:</strong>{" "}
                                {latestRide.pickupLocation}
                            </p>

                            <p>
                                <strong>Destination:</strong>{" "}
                                {latestRide.destination}
                            </p>

                            <div className="flex items-center gap-3">

                                <strong>Status:</strong>

                                <span
                                    className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            ${
                                        latestRide.status === "REQUESTED"
                                            ? "bg-yellow-600"
                                            : latestRide.status === "ACCEPTED"
                                                ? "bg-blue-600"
                                                : latestRide.status === "IN_PROGRESS"
                                                    ? "bg-purple-600"
                                                    : latestRide.status === "COMPLETED"
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                    }
        `}
                                >
        {latestRide.status}
    </span>

                            </div>

                            {
                                latestRide.driver && (

                                    <p>
                                        <strong>Driver:</strong>{" "}
                                        {
                                            latestRide.driver.name
                                        }
                                    </p>

                                )
                            }

                        </div>

                    ) : (

                        <p className="text-slate-400">
                            No rides yet.
                        </p>

                    )
                }

            </div>

        </div>
    );
}