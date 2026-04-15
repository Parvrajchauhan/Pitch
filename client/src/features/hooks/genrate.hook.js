import { useContext } from "react";
import { PitchContext } from "../pitch.context";
import { generate } from "../service/genrate.api";

export const usePitch = () => {
    const context = useContext(PitchContext);

    const {
        panels,
        setPanels,
        loader,
        setLoader
    } = context;

    const useGenerate = async ({ text, style }) => {
        setLoader(true);

        let resp = null;

        try {
            resp = await generate({ text, style });

            console.log("API RESPONSE:", resp); // keep for debugging

            // ✅ FIX: map backend → frontend format
            const formattedPanels = resp?.panels?.map((p) => ({
                text: p.segment,
                image: p.image_url   // keep full base64 string
            })) || [];

            setPanels(formattedPanels);

            return formattedPanels;

        } catch (error) {
            console.error("Generation error:", error);
            return [];
        } finally {
            setLoader(false);
        }
    };

    return {
        panels,
        loader,
        useGenerate
    };
};