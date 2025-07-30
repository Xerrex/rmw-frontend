import { Routes, Route } from "react-router";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import DashHome from "./Dashboard/Home/DashHome";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="*" element={<DashHome/>}/>  
        <Route path="" element={<DashHome/>}/>
      </Route>
    </Routes>
  )
}

export default App
