import axios from "axios";

const VITE_API_URL = "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: VITE_API_URL,
    withCredentials: true
});

export const generate = async ({ text, style }) => {
    try {
        const response = await api.post(
            "/generate",  
            {
                text: text,
                style: style
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};