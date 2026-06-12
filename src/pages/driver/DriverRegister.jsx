import { useState } from "react";
import api from "../../api/api";
import AuthCard from "../../components/AuthCard";
import FormInput from "../../components/FormInput";

export default function DriverRegister() {

    const [form,setForm] = useState({
        name:"",
        phoneNumber:"",
        password:"",
        vehicleNumber:"",
        vehicleType:""
    });

    const register = async () => {

        try {

            await api.post(
                "/register/driver",
                form
            );

            alert("Driver Registered");

        } catch {

            alert("Registration Failed");
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

            <AuthCard title="Driver Registration">

                <div className="space-y-4">

                    <FormInput
                        placeholder="Driver Name"
                        onChange={(e)=>
                            setForm({
                                ...form,
                                name:e.target.value
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
                        placeholder="Vehicle Number"
                        onChange={(e)=>
                            setForm({
                                ...form,
                                vehicleNumber:e.target.value
                            })
                        }
                    />

                    <FormInput
                        placeholder="Vehicle Type"
                        onChange={(e)=>
                            setForm({
                                ...form,
                                vehicleType:e.target.value
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
                            bg-purple-600
                            py-3
                            rounded-xl
                            hover:bg-purple-700
                        "
                    >
                        Register
                    </button>

                </div>

            </AuthCard>

        </div>
    );
}