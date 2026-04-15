import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { PitchProvider } from "./features/pitch.context";

function App() {
    return (
        <PitchProvider>
            <RouterProvider router={router} />
        </PitchProvider>
    );
}

export default App;