import { createRoot } from "react-dom/client";
import App from "App";
import "index.scss";

async function start() {
  // we can do some async actions

  const container = document.getElementById("root") as HTMLElement;
  const root = createRoot(container);
  root.render(<App />);
}

start();
