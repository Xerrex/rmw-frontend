import { Routes, Route } from "react-router";
import LandingPage from "./Landing/LandingPage";
import Dashboard from "./Dashboard/Dashboard";
import DashboardHome from "./Dashboard/Home/DashHome";
import Rides from "./Dashboard/Rides/Rides";
import Profile from "./Dashboard/Profile/Profile";


function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="*" element={<LandingPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="*" element={<DashboardHome/>}/>  
        <Route path="home" element={<DashboardHome/>}/>
        <Route path="rides" element={<Rides/>}/>
        <Route path="profile" element={<Profile/>}/>
      </Route>
    </Routes>
  )
}

export default App
