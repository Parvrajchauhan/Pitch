import { createBrowserRouter } from "react-router-dom";
import Input from "./features/pages/Input";
import Generate from "./features/pages/Generate";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Input />,
    },
    {
        path: "/generate",
        element: <Generate />,
    }
]);