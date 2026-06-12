import { useState } from "react";
import api from "../../api/api";
import AuthCard from "../../components/AuthCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function CustomerLogin() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const login = async () => {

        try {

            const res = await api.post(
                "/login/customer",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "customer",
                JSON.stringify(res.data)
            );

            navigate("/customer/dashboard");

        } catch {

            alert("Invalid Credentials");
        }
    };

    return (

        <div className="
            min-h-screen
            flex
            justify-center
            items-center
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-slate-900
        ">

            <AuthCard title="Customer Login">

                <div className="space-y-4">

                    <input
                        placeholder="Email"
                        className="
                            w-full
                            p-3
                            rounded-xl
                            bg-white/10
                            border
                            border-white/20
                        "
                        onChange={(e)=>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="
                            w-full
                            p-3
                            rounded-xl
                            bg-white/10
                            border
                            border-white/20
                        "
                        onChange={(e)=>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        onClick={login}
                        className="
                            w-full
                            bg-blue-600
                            py-3
                            rounded-xl
                            hover:bg-blue-700
                        "
                    >
                        Login
                    </button>
                    <div className="text-center mt-4 text-slate-300">

                        Don't have an account?

                        <Link
                            to="/customer/register"
                            className="ml-2 text-blue-400 hover:text-blue-300"
                        >
                            Sign Up
                        </Link>

                    </div>
                </div>

            </AuthCard>

        </div>
    );
}