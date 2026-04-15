import { useState } from "react";
import { usePitch } from "../hooks/genrate.hook";
import { useNavigate } from "react-router-dom";

const styles = [
    "cinematic",
    "anime",
    "realistic",
    "sketch",
    "fantasy",
    "corporate"
];

const Input = () => {
    const { useGenerate, loader } = usePitch();
    const navigate = useNavigate();

    const [text, setText] = useState("");
    const [style, setStyle] = useState("");

    const handleSubmit = async () => {
        if (!text || !style) {
            alert("Enter text and select a style");
            return;
        }

        const panels = await useGenerate({ text, style });

        if (panels && panels.length > 0) {
            navigate("/generate");
        } else {
            alert("Failed to generate panels");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-2xl flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-center">
                    Pitch Visualizer
                </h2>

                {/* TEXT INPUT */}
                <textarea
                    className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your story / pitch..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                {/* STYLE DROPDOWN */}
                <select
                    className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                >
                    <option value="">Select style</option>
                    {styles.map((s) => (
                        <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                    ))}
                </select>

                {/* BUTTON */}
                <button
                    onClick={handleSubmit}
                    disabled={loader}
                    className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                    {loader ? "Generating..." : "Generate"}
                </button>
            </div>
        </div>
    );
};

export default Input;