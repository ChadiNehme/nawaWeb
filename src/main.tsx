import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import AppWithSplash from "./AppWithSplash"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithSplash />
  </StrictMode>
)
