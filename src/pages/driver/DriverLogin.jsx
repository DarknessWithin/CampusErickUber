import { useState } from "react";
import api from "../../api/api";
import AuthCard from "../../components/AuthCard";
import FormInput from "../../components/FormInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function DriverLogin() {

    const [phoneNumber,setPhoneNumber] =
        useState("");

    const [password,setPassword] =
        useState("");
    const navigate = useNavigate();
    const login = async () => {

        try {

            const res = await api.post(
                "/login/driver",
                {
                    phoneNumber,
                    password
                }
            );

            localStorage.setItem(
                "driver",
                JSON.stringify(res.data)
            );

            navigate("/driver/dashboard");

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
            via-purple-950
            to-slate-900
        ">

            <AuthCard title="Driver Login">

                <div className="space-y-4">

                    <FormInput
                        placeholder="Phone Number"
                        onChange={(e)=>
                            setPhoneNumber(
                                e.target.value
                            )
                        }
                    />

                    <FormInput
                        type="password"
                        placeholder="Password"
                        onChange={(e)=>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <button
                        onClick={login}
                        className="
                            w-full
                            bg-purple-600
                            py-3
                            rounded-xl
                            hover:bg-purple-700
                        "
                    >
                        Login
                    </button>
                    <div className="text-center mt-4 text-slate-300">

                        Don't have an account?

                        <Link
                            to="/driver/register"
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