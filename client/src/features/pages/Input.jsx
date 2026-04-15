import { useState } from "react";
import { usePitch } from "../hooks/genrate.hook";
import { useNavigate } from "react-router-dom";

const styles = [
    { id: "cinematic", icon: "🎬" },
    { id: "anime", icon: "✨" },
    { id: "realistic", icon: "📷" },
    { id: "sketch", icon: "✏️" },
    { id: "fantasy", icon: "🔮" },
    { id: "corporate", icon: "💼" },
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
        <div
            className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0077B6 0%, #0096C7 50%, #00B4D8 100%)" }}
        >
            {/* Decorative background blobs */}
            <div
                className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20 pointer-events-none"
                style={{ background: "#90E0EF", filter: "blur(60px)" }}
            />
            <div
                className="absolute bottom-[-60px] left-[-60px] w-72 h-72 rounded-full opacity-20 pointer-events-none"
                style={{ background: "#0077B6", filter: "blur(80px)" }}
            />
            <div
                className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                style={{ background: "#48CAE4", filter: "blur(40px)" }}
            />

            {/* Glass card */}
            <div
                className="relative w-full max-w-2xl rounded-3xl p-8 flex flex-col gap-6"
                style={{
                    background: "rgba(255,255,255,0.10)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    boxShadow: "0 32px 64px rgba(0,55,92,0.25), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
            >
                {/* Header */}
                <div className="text-center mb-2">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
                        style={{
                            background: "rgba(144,224,239,0.18)",
                            border: "1px solid rgba(144,224,239,0.35)",
                            color: "#90E0EF",
                            letterSpacing: "0.15em",
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ background: "#90E0EF" }}
                        />
                        AI Storyboard Generator
                    </div>
                    <h1
                        className="text-4xl font-black tracking-tight"
                        style={{
                            color: "#ffffff",
                            textShadow: "0 2px 20px rgba(0,150,199,0.4)",
                            fontFamily: "'Georgia', serif",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Pitch Visualizer
                    </h1>
                    <p className="mt-2 text-sm" style={{ color: "rgba(144,224,239,0.8)" }}>
                        Transform your narrative into a visual storyboard
                    </p>
                </div>

                {/* Divider */}
                <div
                    className="h-px w-full"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(144,224,239,0.4), transparent)" }}
                />

                {/* Textarea */}
                <div className="relative">
                    <label
                        className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "#90E0EF", letterSpacing: "0.12em" }}
                    >
                        Your Story
                    </label>
                    <textarea
                        className="w-full h-36 p-4 rounded-2xl text-sm resize-none outline-none transition-all duration-300"
                        style={{
                            background: "rgba(0,55,92,0.35)",
                            border: "1px solid rgba(144,224,239,0.2)",
                            color: "#ffffff",
                            caretColor: "#90E0EF",
                            lineHeight: "1.7",
                            fontFamily: "inherit",
                        }}
                        placeholder="Enter your pitch or customer success story..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={(e) => {
                            e.target.style.border = "1px solid rgba(144,224,239,0.6)";
                            e.target.style.boxShadow = "0 0 0 3px rgba(72,202,228,0.15)";
                        }}
                        onBlur={(e) => {
                            e.target.style.border = "1px solid rgba(144,224,239,0.2)";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                    <div
                        className="absolute bottom-3 right-4 text-xs"
                        style={{ color: "rgba(144,224,239,0.4)" }}
                    >
                        {text.length} chars
                    </div>
                </div>

                {/* Style Selector */}
                <div>
                    <label
                        className="block text-xs font-semibold uppercase tracking-widest mb-3"
                        style={{ color: "#90E0EF", letterSpacing: "0.12em" }}
                    >
                        Visual Style
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {styles.map((s) => {
                            const selected = style === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setStyle(s.id)}
                                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                                    style={
                                        selected
                                            ? {
                                                  background: "rgba(72,202,228,0.25)",
                                                  border: "1px solid rgba(72,202,228,0.7)",
                                                  color: "#ffffff",
                                                  boxShadow: "0 0 16px rgba(72,202,228,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                                                  transform: "scale(1.02)",
                                              }
                                            : {
                                                  background: "rgba(0,55,92,0.3)",
                                                  border: "1px solid rgba(144,224,239,0.15)",
                                                  color: "rgba(144,224,239,0.7)",
                                              }
                                    }
                                >
                                    <span style={{ fontSize: "14px" }}>{s.icon}</span>
                                    {s.id.charAt(0).toUpperCase() + s.id.slice(1)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loader}
                    className="relative w-full py-4 rounded-2xl font-bold text-base tracking-wide overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{
                        background: loader
                            ? "rgba(0,150,199,0.4)"
                            : "linear-gradient(135deg, #0077B6 0%, #0096C7 60%, #00B4D8 100%)",
                        color: "#ffffff",
                        border: "1px solid rgba(144,224,239,0.4)",
                        boxShadow: loader
                            ? "none"
                            : "0 8px 32px rgba(0,119,182,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                        letterSpacing: "0.05em",
                    }}
                    onMouseEnter={(e) => {
                        if (!loader) {
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow = "0 12px 40px rgba(0,119,182,0.6), inset 0 1px 0 rgba(255,255,255,0.2)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 8px 32px rgba(0,119,182,0.5), inset 0 1px 0 rgba(255,255,255,0.2)";
                    }}
                >
                    {loader ? (
                        <span className="flex items-center justify-center gap-3">
                            <svg
                                className="animate-spin w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    cx="12" cy="12" r="10"
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M12 2a10 10 0 0 1 10 10"
                                    stroke="#ffffff"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                            Generating storyboard...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Generate Storyboard
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M5 12h14M13 6l6 6-6 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Input;