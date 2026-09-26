import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./components/App";
import TanStackProvider from "./components/TanStackProvider/TanStackProvider";

createRoot(document.getElementById("root")!).render(
  <TanStackProvider>
    <App />
  </TanStackProvider>,
);
