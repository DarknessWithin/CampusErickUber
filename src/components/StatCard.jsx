export default function StatCard({
                                     title,
                                     value,
                                     icon = "📊"
                                 }) {
    return (
        <div
            className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
                shadow-lg
                hover:border-blue-500
                hover:-translate-y-1
                transition-all
                duration-200
            "
        >
            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-400 text-sm">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {value}
                    </h2>

                </div>

                <div className="text-4xl">
                    {icon}
                </div>

            </div>
        </div>
    );
}