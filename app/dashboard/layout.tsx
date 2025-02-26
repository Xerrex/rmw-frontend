import Sidenav from "./ui/sidenav";
import Navbar from "./ui/navbar";


export default function DashboardLayout({children}: {children: React.ReactNode}){
  return(
    <div className="flex bg-slate-200">
      <Sidenav/>
      <div className="flex-1 flex flex-col">
        <Navbar/>
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  )
}