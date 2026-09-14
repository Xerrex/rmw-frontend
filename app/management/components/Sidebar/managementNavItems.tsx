import { GalleryVerticalEndIcon, ChartSpline, Users } from "lucide-react";


const ManagementNavItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Ride My Way",
      logo: (<GalleryVerticalEndIcon/>),
      plan: "Management",
    },
  ],
  navMain: [
    {
      title: "Analytics",
      url: "/management/analytics",
      icon: (<ChartSpline/>),
    },
    {
      title: "User Access",
      url: "/management/users",
      icon: (<Users/>),
    },
  ]
}

export default ManagementNavItems;
