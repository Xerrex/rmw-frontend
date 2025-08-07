import { Routes, Route } from "react-router";
import LandingPage from "./Landing/LandingPage";
import Dashboard from "./Dashboard/Dashboard";
import DashboardHome from "./Dashboard/Home/DashHome";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="*" element={<LandingPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="*" element={<DashboardHome/>}/>  
        <Route path="" element={<DashboardHome/>}/>
      </Route>
    </Routes>
  )
}

export default App
