import { Calendar, Clipboard, LayoutDashboard } from "lucide-react";

export const NAVBAR_LINKS = [
  {
    id: 0,
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: 1,
    title: "Registration",
    href: "/registration",
    icon: <Clipboard />,
  },
  {
    id: 2,
    title: "Timetable",
    href: "/timetable",
    icon: <Calendar />,
  },
];
