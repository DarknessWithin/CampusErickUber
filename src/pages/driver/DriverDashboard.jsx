import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import StatCard from "../../components/StatCard";
import {
    connectWebSocket,
    disconnectWebSocket
} from "../../services/websocket";

export default function DriverDashboard() {

    const navigate = useNavigate();

    const driver =
        JSON.parse(
            localStorage.getItem("driver")
        );

    const [dashboard, setDashboard] =
        useState(null);

    const [status, setStatus] =
        useState(
            driver?.status || "OFFLINE"
        );

    const loadDashboard = async () => {

        try {

            const res =
                await api.get(
                    `/driver/${driver.id}/dashboard`
                );

            setDashboard(res.data);

        } catch (err) {

            console.error(
                "Dashboard load failed",
                err
            );
        }
    };

    const refreshDriverStatus = async () => {

        try {

            const res =
                await api.get(
                    `/driver/${driver.id}/rides`
                );

            const activeRide =
                res.data.find(
                    ride =>
                        ride.status === "ACCEPTED" ||
                        ride.status === "IN_PROGRESS"
                );

            if (activeRide) {

                setStatus("BUSY");

            } else {

                const storedDriver =
                    JSON.parse(
                        localStorage.getItem("driver")
                    );

                setStatus(
                    storedDriver?.status ||
                    "OFFLINE"
                );
            }

        } catch (err) {

            console.error(err);
        }
    };

    useEffect(() => {

        loadDashboard();
        refreshDriverStatus();

        connectWebSocket(() => {

            loadDashboard();
            refreshDriverStatus();
        });

        return () => {

            disconnectWebSocket();
        };

    }, []);
    useEffect(() => {

        const handleUnload = () => {

            navigator.sendBeacon(
                `http://localhost:8080/driver/${driver.id}/offline`
            );
        };

        window.addEventListener(
            "beforeunload",
            handleUnload
        );

        return () => {

            window.removeEventListener(
                "beforeunload",
                handleUnload
            );
        };

    }, []);

    const goOnline = async () => {

        try {

            await api.put(
                `/driver/${driver.id}/online`
            );

            const updatedDriver = {
                ...driver,
                status: "ONLINE"
            };

            localStorage.setItem(
                "driver",
                JSON.stringify(updatedDriver)
            );

            setStatus("ONLINE");

            loadDashboard();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to go online"
            );
        }
    };

    const goOffline = async () => {

        try {

            await api.put(
                `/driver/${driver.id}/offline`
            );

            const updatedDriver = {
                ...driver,
                status: "OFFLINE"
            };

            localStorage.setItem(
                "driver",
                JSON.stringify(updatedDriver)
            );

            setStatus("OFFLINE");

            loadDashboard();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to go offline"
            );
        }
    };

    const logout = async () => {

        try {

            await api.put(
                `/driver/${driver.id}/offline`
            );

        } catch (err) {

            console.error(
                "Failed to set offline",
                err
            );
        }

        localStorage.removeItem("driver");

        navigate("/");
    };

    const statusColor =
        status === "ONLINE"
            ? "bg-green-600"
            : status === "BUSY"
                ? "bg-yellow-600"
                : "bg-red-600";

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
                    items-start
                    flex-wrap
                    gap-4
                "
            >

                <div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                        "
                    >
                        Welcome, {driver?.name}
                    </h1>

                    <p
                        className="
                            text-slate-400
                            mt-2
                        "
                    >
                        Vehicle: {driver?.vehicleNumber}
                    </p>

                    <p
                        className="
                            text-slate-400
                            mt-1
                        "
                    >
                        Type: {driver?.vehicleType}
                    </p>

                </div>

                <div className="flex gap-3 items-center">

                    <div
                        className={`
                            px-5
                            py-2
                            rounded-full
                            font-semibold
                            ${statusColor}
                        `}
                    >
                        {status}
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

            </div>

            <div
                className="
                    grid
                    md:grid-cols-4
                    gap-6
                    mt-10
                "
            >

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
                    title="Rating"
                    value={
                        dashboard?.averageRating
                            ?.toFixed(1)
                        ?? "0.0"
                    }
                />

            </div>

            <div
                className="
                    flex
                    gap-4
                    flex-wrap
                    mt-10
                "
            >

                <button
                    onClick={goOnline}
                    className="
                        bg-green-600
                        hover:bg-green-700
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                    "
                >
                    Go Online
                </button>

                <button
                    onClick={goOffline}
                    className="
                        bg-red-600
                        hover:bg-red-700
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                    "
                >
                    Go Offline
                </button>

                <button
                    onClick={() =>
                        navigate(
                            "/driver/pending"
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
                    Pending Rides
                </button>

                <button
                    onClick={() =>
                        navigate(
                            "/driver/rides"
                        )
                    }
                    className="
                        bg-purple-600
                        hover:bg-purple-700
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                    "
                >
                    My Rides
                </button>

            </div>

        </div>
    );
}