import { Button } from "@/components/ui/button"
import Nav from "./components/shared/Nav.jsx"
import Sidebar from "./components/shared/Sidebar.jsx"
import Layout from "./components/shared/Layout.jsx"
import Dashboard from "./pages/Dashboard.jsx"

import { ErrorBoundary } from "react-error-boundary";
function App() {
  
  return (
    <>
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
      
    </>
  )
}

export default App
