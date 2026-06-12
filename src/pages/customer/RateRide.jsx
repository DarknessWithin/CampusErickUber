import { useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../../api/api";

export default function RateRide() {

    const { rideId } = useParams();

    const navigate = useNavigate();

    const [stars, setStars] =
        useState(5);

    const [feedback, setFeedback] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const submitRating = async () => {

        try {

            setLoading(true);

            await api.post(
                "/rating/submit",
                {
                    rideId: Number(rideId),
                    stars,
                    feedback
                }
            );

            alert("Rating submitted");

            navigate("/customer/rides");

        } catch (err) {

            alert(
                err?.response?.data ||
                "Unable to submit rating"
            );

        } finally {

            setLoading(false);
        }
    };

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
                    max-w-xl
                    mx-auto
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-8
                "
            >

                <h1
                    className="
                        text-4xl
                        font-bold
                        mb-8
                    "
                >
                    Rate Ride #{rideId}
                </h1>

                <div className="space-y-6">

                    <div>

                        <p className="mb-3">
                            Rating
                        </p>

                        <div
                            className="
                                flex
                                gap-2
                                text-4xl
                            "
                        >

                            {[1,2,3,4,5].map(
                                (num) => (

                                    <button
                                        key={num}
                                        onClick={() =>
                                            setStars(num)
                                        }
                                    >
                                        {
                                            num <= stars
                                                ? "⭐"
                                                : "☆"
                                        }
                                    </button>

                                )
                            )}

                        </div>

                    </div>

                    <textarea
                        rows="5"
                        placeholder="Share your experience..."
                        value={feedback}
                        onChange={(e) =>
                            setFeedback(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            bg-slate-800
                            p-4
                            rounded-xl
                        "
                    />

                    <button
                        disabled={loading}
                        onClick={submitRating}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            py-3
                            rounded-xl
                            font-semibold
                        "
                    >
                        {
                            loading
                                ? "Submitting..."
                                : "Submit Rating"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}