import { useState } from "react";
import api from "../../api/api";

export default function BookRide() {

    const customer =
        JSON.parse(localStorage.getItem("customer"));

    const [pickup,setPickup] = useState("");
    const [destination,setDestination] =
        useState("");

    const requestRide = async () => {

        await api.post(
            "/ride/request",
            {
                customerId:
                customer.userId,
                pickupLocation:
                pickup,
                destination
            }
        );

        alert("Ride Requested");
    };

    return (

        <div>

            <h2>Book Ride</h2>

            <input
                placeholder="Pickup"
                onChange={(e)=>
                    setPickup(e.target.value)
                }
            />

            <input
                placeholder="Destination"
                onChange={(e)=>
                    setDestination(e.target.value)
                }
            />

            <button onClick={requestRide}>
                Request Ride
            </button>

        </div>
    );
}