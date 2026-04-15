import { useState } from "react";
import { usePitch } from "../hooks/genrate.hook";
import { useNavigate } from "react-router-dom";

const Generate = () => {
    const { panels, loader } = usePitch();
    const navigate = useNavigate();
    const [revealed, setRevealed] = useState({});
    const [activePanel, setActivePanel] = useState(null);

    const toggleReveal = (index) => {
        setRevealed((prev) => ({ ...prev, [index]: !prev[index] }));
    };

     if (loader) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-8"
                style={{ background: "linear-gradient(135deg, #0077B6 0%, #0096C7 50%, #00B4D8 100%)" }}
            >
                <style>{`
                    @keyframes filmBounce {
                        0%, 100% { transform: translateY(0); opacity: 0.45; }
                        50%       { transform: translateY(-14px); opacity: 1; }
                    }
                    @keyframes shimmer {
                        0%   { background-position: -600px 0; }
                        100% { background-position:  600px 0; }
                    }
                `}</style>
                <div className="flex flex-col gap-3 w-72">
                    {[1, 0.7, 0.45].map((op, i) => (
                        <div
                            key={i}
                            className="h-3 rounded-full"
                            style={{
                                opacity: op,
                                backgroundImage:
                                    "linear-gradient(90deg, rgba(144,224,239,0.15) 0%, rgba(144,224,239,0.45) 50%, rgba(144,224,239,0.15) 100%)",
                                backgroundSize: "600px 100%",
                                animation: `shimmer 1.6s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        />
                    ))}
                </div>
                <div className="flex gap-3">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                                background: "#90E0EF",
                                animation: `filmBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
                            }}
                        />
                    ))}
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold" style={{ color: "#fff", fontFamily: "'Georgia', serif" }}>
                        Crafting your storyboard
                    </p>
                    <p className="text-sm mt-1" style={{ color: "rgba(144,224,239,0.8)" }}>
                        AI is painting your narrative…
                    </p>
                </div>
            </div>
        );
    }

    if (!panels || panels.length === 0) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-5"
                style={{ background: "linear-gradient(135deg, #0077B6 0%, #0096C7 50%, #00B4D8 100%)" }}
            >
                <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(144,224,239,0.25)" }}
                >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="3" stroke="rgba(144,224,239,0.7)" strokeWidth="1.5" />
                        <path d="M3 9h18M9 21V9" stroke="rgba(144,224,239,0.7)" strokeWidth="1.5" />
                    </svg>
                </div>
                <p className="text-lg font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                    No panels yet
                </p>
                <p className="text-sm" style={{ color: "rgba(144,224,239,0.65)" }}>
                    Go back and generate your first storyboard
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-1 flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                    style={{
                        background: "rgba(72,202,228,0.18)",
                        border: "1px solid rgba(72,202,228,0.45)",
                        color: "#fff",
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to input
                </button>
            </div>
        );
    }

    return (
        <>
            <style>{`
                html { scroll-behavior: smooth; }

                .panel-img {
                    transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .panel-wrap:hover .panel-img {
                    transform: scale(1.04);
                }

                .prompt-box {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.38s ease, opacity 0.3s ease;
                    opacity: 0;
                }
                .prompt-box.open {
                    max-height: 220px;
                    opacity: 1;
                }

                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb {
                    background: rgba(144,224,239,0.3);
                    border-radius: 99px;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(32px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .panel-enter { animation: fadeUp 0.6s ease both; }

                @keyframes lbIn  { from { opacity: 0; } to { opacity: 1; } }
                @keyframes lbImg {
                    from { transform: scale(0.93); opacity: 0; }
                    to   { transform: scale(1);    opacity: 1; }
                }
                .lb-bg  { animation: lbIn  0.22s ease both; }
                .lb-img { animation: lbImg 0.32s ease both; }
            `}</style>

            {/* Fixed background */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(160deg, #004E7C 0%, #0077B6 30%, #0096C7 65%, #00B4D8 100%)",
                    zIndex: 0,
                }}
            />
            <div
                className="fixed top-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
                style={{ background: "#90E0EF", filter: "blur(120px)", zIndex: 0 }}
            />
            <div
                className="fixed bottom-[-80px] left-[-80px] w-96 h-96 rounded-full pointer-events-none opacity-10"
                style={{ background: "#0077B6", filter: "blur(90px)", zIndex: 0 }}
            />

            {/* Sticky top nav */}
            <header
                className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
                style={{
                    background: "rgba(0,50,82,0.6)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(144,224,239,0.1)",
                }}
            >
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ color: "#90E0EF" }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    New pitch
                </button>

                <h1
                    className="text-lg font-black tracking-tight"
                    style={{ color: "#fff", fontFamily: "'Georgia', serif", letterSpacing: "-0.01em" }}
                >
                    Your Storyboard
                </h1>

                <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                        background: "rgba(144,224,239,0.12)",
                        border: "1px solid rgba(144,224,239,0.28)",
                        color: "#90E0EF",
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#90E0EF" }} />
                    {panels.length} scenes
                </div>
            </header>

            {/* Scrollable panel feed */}
            <main className="relative z-10 max-w-3xl mx-auto px-4 py-10 flex flex-col gap-10 pb-28">
                {panels.map((panel, index) => (
                    <article
                        key={index}
                        className="panel-wrap panel-enter rounded-3xl overflow-hidden"
                        style={{
                            animationDelay: `${index * 0.09}s`,
                            background: "rgba(255,255,255,0.07)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            boxShadow: "0 16px 56px rgba(0,35,65,0.35)",
                        }}
                    >
                        {/* Large image — click to lightbox */}
                        <div
                            className="relative overflow-hidden cursor-zoom-in"
                            style={{ height: "clamp(280px, 62vh, 640px)" }}
                            onClick={() => setActivePanel(panel)}
                        >
                            <img
                                src={panel.image}
                                alt={`Scene ${index + 1}`}
                                className="panel-img w-full h-full object-cover"
                            />

                            {/* Cinematic gradient overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(0,25,55,0.85) 0%, rgba(0,25,55,0.25) 42%, transparent 68%)",
                                }}
                            />

                            {/* Scene badge — top left */}
                            <div
                                className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                                style={{
                                    background: "rgba(0,50,82,0.78)",
                                    border: "1px solid rgba(144,224,239,0.4)",
                                    color: "#90E0EF",
                                    backdropFilter: "blur(10px)",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                <span style={{ color: "rgba(144,224,239,0.5)", fontWeight: 400 }}>scene</span>
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            {/* Expand icon — top right */}
                            <div
                                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                                style={{
                                    background: "rgba(0,50,82,0.7)",
                                    border: "1px solid rgba(144,224,239,0.28)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="#90E0EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {/* Caption overlaid on image bottom */}
                            <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-10">
                                <p
                                    className="text-base leading-relaxed font-medium"
                                    style={{
                                        color: "rgba(255,255,255,0.95)",
                                        textShadow: "0 1px 10px rgba(0,0,0,0.6)",
                                    }}
                                >
                                    {panel.text}
                                </p>
                            </div>
                        </div>

                        {/* Prompt reveal footer */}
                        {panel.engineered_prompt && (
                            <div
                                className="px-5 py-3.5"
                                style={{ borderTop: "1px solid rgba(144,224,239,0.1)" }}
                            >
                                <button
                                    onClick={() => toggleReveal(index)}
                                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest w-full transition-opacity hover:opacity-75"
                                    style={{ color: "#48CAE4", letterSpacing: "0.09em" }}
                                >
                                    <svg
                                        width="13" height="13" viewBox="0 0 24 24" fill="none"
                                        style={{
                                            transform: revealed[index] ? "rotate(180deg)" : "rotate(0deg)",
                                            transition: "transform 0.25s ease",
                                        }}
                                    >
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {revealed[index] ? "Hide" : "View"} AI-engineered prompt
                                    <span
                                        className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                        style={{
                                            background: "rgba(72,202,228,0.14)",
                                            border: "1px solid rgba(72,202,228,0.28)",
                                            color: "#48CAE4",
                                            letterSpacing: "0.04em",
                                        }}
                                    >
                                        Gemini
                                    </span>
                                </button>

                                <div className={`prompt-box ${revealed[index] ? "open" : ""}`}>
                                    <p
                                        className="mt-3 text-xs leading-relaxed"
                                        style={{
                                            color: "rgba(144,224,239,0.82)",
                                            fontStyle: "italic",
                                            borderLeft: "2px solid rgba(72,202,228,0.38)",
                                            paddingLeft: "12px",
                                        }}
                                    >
                                        {panel.engineered_prompt}
                                    </p>
                                </div>
                            </div>
                        )}
                    </article>
                ))}

                {/* End of feed */}
                <div className="flex flex-col items-center gap-4 pt-2">
                    <div className="w-12 h-px" style={{ background: "rgba(144,224,239,0.25)" }} />
                    <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(144,224,239,0.45)", letterSpacing: "0.12em" }}>
                        End of storyboard · {panels.length} scenes
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold"
                        style={{
                            background: "linear-gradient(135deg, rgba(0,119,182,0.6), rgba(0,180,216,0.5))",
                            border: "1px solid rgba(144,224,239,0.32)",
                            color: "#fff",
                            boxShadow: "0 6px 28px rgba(0,70,110,0.35)",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,70,110,0.5)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,70,110,0.35)";
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Generate another storyboard
                    </button>
                </div>
            </main>

            {/* Lightbox */}
            {activePanel && (
                <div
                    className="lb-bg fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: "rgba(0,15,35,0.93)", backdropFilter: "blur(14px)" }}
                    onClick={() => setActivePanel(null)}
                >
                    <div
                        className="lb-img relative max-w-5xl w-full rounded-2xl overflow-hidden"
                        style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={activePanel.image}
                            alt="Full panel"
                            className="w-full object-contain"
                            style={{ maxHeight: "80vh" }}
                        />
                        <div
                            className="px-6 py-4"
                            style={{
                                background: "rgba(0,25,50,0.92)",
                                borderTop: "1px solid rgba(144,224,239,0.12)",
                            }}
                        >
                            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>
                                {activePanel.text}
                            </p>
                        </div>
                        <button
                            onClick={() => setActivePanel(null)}
                            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                            style={{
                                background: "rgba(0,50,82,0.85)",
                                border: "1px solid rgba(144,224,239,0.28)",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6l12 12" stroke="#90E0EF" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Generate;