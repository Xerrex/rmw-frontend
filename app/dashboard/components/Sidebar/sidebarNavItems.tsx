import { GalleryVerticalEndIcon, TerminalSquareIcon, FrameIcon, PieChartIcon, 
  LayoutDashboard, CarFront, Users, ChartSpline, Settings} from "lucide-react";


const SidebarNavItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Ride My Way",
      logo: (<GalleryVerticalEndIcon/>),
      plan: "Ride Sharing",
    },
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: (<LayoutDashboard/>),
      isActive: true,
    },
    {
      title: "Rides",
      url: "/dashboard/rides",
      icon: (<CarFront/>),
      isActive: true,
    },
    {
      title: "Requests",
      url: "/dashboard/rides-requests",
      icon: (<Users/>),
      isActive: true,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: (<ChartSpline/>),
      isActive: true,
    },
    {
      title: "Settings",
      url: "#",
      icon: (<Settings/>),
      isActive: true,
    },
    {
      title: "Playground",
      url: "#",
      icon: (<TerminalSquareIcon/>),
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (
        <FrameIcon
        />
      ),
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (
        <PieChartIcon
        />
      ),
    },
  ],
}

export default SidebarNavItems;
