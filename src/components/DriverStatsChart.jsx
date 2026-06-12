import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

export default function DriverStatsChart({
                                             dashboard
                                         }) {

    const data = [
        {
            name: "Completed",
            value: dashboard?.completedRides || 0
        },
        {
            name: "Cancelled",
            value: dashboard?.cancelledRides || 0
        },
        {
            name: "Active",
            value: dashboard?.activeRides || 0
        }
    ];

    const COLORS = [
        "#22c55e",
        "#ef4444",
        "#3b82f6"
    ];

    return (
        <div
            className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
                mt-8
            "
        >
            <h2 className="text-xl font-bold mb-4">
                Ride Analytics
            </h2>

            <PieChart
                width={400}
                height={280}
            >
                <Pie
                    data={data}
                    dataKey="value"
                    outerRadius={100}
                    label
                >
                    {
                        data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))
                    }
                </Pie>

                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}