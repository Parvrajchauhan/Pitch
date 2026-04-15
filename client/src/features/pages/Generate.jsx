import { usePitch } from "../hooks/genrate.hook";

const Generate = () => {
    const { panels, loader } = usePitch();

    if (loader) {
        return (
            <p className="text-center mt-10 text-lg font-medium">
                Generating panels...
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            {panels && panels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {panels.map((panel, index) => (
                        <div
                            key={index}
                            className="bg-white border rounded-xl shadow p-3"
                        >
                            {/* ✅ FIX: use image directly */}
                            <img
                                src={panel.image}
                                alt="generated"
                                className="w-full h-48 object-cover rounded-lg"
                            />

                            <p className="mt-2 text-sm text-gray-700">
                                {panel.text}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-10 text-gray-500">
                    No panels yet
                </p>
            )}
        </div>
    );
};

export default Generate;