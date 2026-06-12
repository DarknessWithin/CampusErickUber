import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate();

    const features = [
        {
            icon: "🚗",
            title: "Ride Requests",
            desc: "Request rides instantly across campus"
        },
        {
            icon: "⚡",
            title: "Realtime Updates",
            desc: "Live ride status via WebSockets"
        },
        {
            icon: "📊",
            title: "Analytics",
            desc: "Driver dashboard and statistics"
        },
        {
            icon: "⭐",
            title: "Ratings",
            desc: "Feedback and performance tracking"
        }
    ];

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <nav className="flex justify-between items-center px-10 py-6">

                <h1 className="text-3xl font-black text-blue-500">
                    RideFlow
                </h1>

                <div className="space-x-4">

                    <button
                        onClick={() =>
                            navigate("/customer/login")
                        }
                    >
                        Customer
                    </button>

                    <button
                        onClick={() =>
                            navigate("/driver/login")
                        }
                    >
                        Driver
                    </button>

                </div>

            </nav>

            <section className="text-center mt-24 px-6">

                <div
                    className="
                        inline-block
                        bg-blue-600/20
                        border
                        border-blue-600
                        px-4
                        py-2
                        rounded-full
                        mb-6
                    "
                >
                    ⚡ WebSocket Powered
                </div>

                <h1
                    className="
                        text-6xl
                        md:text-8xl
                        font-black
                        bg-gradient-to-r
                        from-blue-400
                        to-cyan-300
                        text-transparent
                        bg-clip-text
                    "
                >
                    RideFlow
                </h1>

                <p
                    className="
                        text-xl
                        text-slate-300
                        mt-6
                        max-w-3xl
                        mx-auto
                    "
                >
                    Campus ride management platform
                    featuring real-time ride assignment,
                    live updates, driver analytics,
                    ratings and feedback.
                </p>

                <div className="mt-10 flex justify-center gap-6">

                    <button
                        onClick={() =>
                            navigate("/customer/login")
                        }
                        className="
                            bg-blue-600
                            px-8
                            py-4
                            rounded-xl
                            font-semibold
                        "
                    >
                        Customer Portal
                    </button>

                    <button
                        onClick={() =>
                            navigate("/driver/login")
                        }
                        className="
                            border
                            border-white
                            px-8
                            py-4
                            rounded-xl
                        "
                    >
                        Driver Portal
                    </button>

                </div>

            </section>

            <section className="max-w-7xl mx-auto mt-28 px-8">

                <h2 className="text-4xl font-bold text-center mb-12">
                    Features
                </h2>

                <div className="grid md:grid-cols-4 gap-6">

                    {features.map((feature) => (

                        <div
                            key={feature.title}
                            className="
                                bg-slate-900
                                border
                                border-slate-800
                                rounded-2xl
                                p-6
                                hover:border-blue-500
                                transition
                            "
                        >
                            <div className="text-5xl">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold mt-4">
                                {feature.title}
                            </h3>

                            <p className="text-slate-400 mt-3">
                                {feature.desc}
                            </p>

                        </div>

                    ))}

                </div>

            </section>

            <section className="max-w-6xl mx-auto mt-28 px-8">

                <h2 className="text-4xl font-bold text-center mb-12">
                    Ride Lifecycle
                </h2>

                <div className="grid md:grid-cols-5 gap-4 text-center">

                    {
                        [
                            "Request",
                            "Accept",
                            "Start",
                            "Complete",
                            "Rate"
                        ].map(step => (

                            <div
                                key={step}
                                className="
                                    bg-slate-900
                                    p-6
                                    rounded-xl
                                    border
                                    border-slate-800
                                "
                            >
                                {step}
                            </div>

                        ))
                    }

                </div>

            </section>

        </div>
    );
}