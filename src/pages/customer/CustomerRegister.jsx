import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import AuthCard from "../../components/AuthCard";
import FormInput from "../../components/FormInput";

export default function CustomerRegister() {

    const navigate = useNavigate();

    const [form,setForm] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        password:""
    });

    const register = async () => {

        try {

            await api.post(
                "/register/customer",
                form
            );

            alert("Registration Successful");

            navigate("/customer/login");

        } catch(err) {

            alert(
                err?.response?.data ||
                "Registration Failed"
            );
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

            <AuthCard title="Create Customer Account">

                <div className="space-y-4">

                    <FormInput
                        placeholder="Full Name"
                        onChange={(e)=>
                            setForm({
                                ...form,
                                name:e.target.value
                            })
                        }
                    />

                    <FormInput
                        placeholder="Email"
                        onChange={(e)=>
                            setForm({
                                ...form,
                                email:e.target.value
                            })
                        }
                    />

                    <FormInput
                        placeholder="Phone Number"
                        onChange={(e)=>
                            setForm({
                                ...form,
                                phoneNumber:e.target.value
                            })
                        }
                    />

                    <FormInput
                        type="password"
                        placeholder="Password"
                        onChange={(e)=>
                            setForm({
                                ...form,
                                password:e.target.value
                            })
                        }
                    />

                    <button
                        onClick={register}
                        className="
                            w-full
                            bg-blue-600
                            py-3
                            rounded-xl
                            hover:bg-blue-700
                            font-semibold
                        "
                    >
                        Register
                    </button>

                </div>

            </AuthCard>

        </div>
    );
}