import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./components/App";
import TanStackProvider from "./components/TanStackProvider/TanStackProvider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <TanStackProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TanStackProvider>,
);
