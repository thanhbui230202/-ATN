import { NavLink, useNavigate } from "react-router-dom";
import { Film, Users, List, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/astoms/tooltip.js";
import { Button } from "../components/astoms/button.js";
import { useToast } from "../hooks/use-toast.js";
import { logout } from "../api/UserAPI.js";

export default function SidebarAdmin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const menuItems = [
    { name: "Films", icon: <Film className="w-5 h-5" />, path: "/admin/films" },
    {
      name: "Users",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/users",
    },
    {
      name: "Categories",
      icon: <List className="w-5 h-5" />,
      path: "/admin/categories",
    },
  ];
  const handleLogout = async () => {
    try {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      const token = localStorage.getItem("token");
      if (token) {
        await logout(token);
      }
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-background text-foreground w-64 p-6 space-y-6 h-full relative border-r shadow">
      <div className="text-2xl font-bold text-center tracking-wide">
        <a href="/admin">DASHBOARD</a>
      </div>
      <nav className="space-y-2">
        <TooltipProvider>
          {menuItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-muted text-muted-foreground"
                        : "hover:bg-muted hover:text-muted-foreground"
                    }`
                  }
                >
                  <div className="flex items-center">
                  {item.icon}
                  <span className="text-base font-medium ml-4">{item.name}</span>
                  </div>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <div className="absolute bottom-5 left-0 right-0 px-4">
        <Button
          variant="ghost"
          className="w-full flex items-center gap-3 justify-start p-3 rounded-lg hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
