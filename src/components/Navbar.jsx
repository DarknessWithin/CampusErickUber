import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="border-b border-slate-800 bg-slate-950">

            <div className="
                max-w-7xl
                mx-auto
                px-8
                py-4
                flex
                justify-between
                items-center
            ">

                <Link
                    to="/"
                    className="
                    text-3xl
                    font-black
                    bg-gradient-to-r
                    from-blue-400
                    to-cyan-300
                    bg-clip-text
                    text-transparent
                ">
                    RideFlow
                </Link>

                <div className="flex gap-6 text-slate-300">

                    <Link
                        to="/customer/login"
                        className="hover:text-white"
                    >
                        Customer
                    </Link>

                    <Link
                        to="/driver/login"
                        className="hover:text-white"
                    >
                        Driver
                    </Link>

                </div>

            </div>

        </nav>
    );
}