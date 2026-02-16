import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, Calendar, BookOpen, BarChart3, PenTool, Users, MessageCircle, Settings, Gift } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { icon: Calendar, label: "My Post Queue", to: "/dashboard/queue" },
  { icon: Sparkles, label: "Inspiration", to: "/dashboard/inspiration" },
  { icon: BookOpen, label: "Library", to: "/dashboard/library" },
  { icon: BarChart3, label: "Analytics", to: "/dashboard/analytics" },
  { icon: PenTool, label: "Content Studio", to: "/dashboard/studio" },
  { icon: Users, label: "Social Hub", to: "/dashboard/social" },
  { icon: MessageCircle, label: "Engage", to: "/dashboard/engage" },
  { icon: Settings, label: "Context", to: "/dashboard/context" },
];

const DashboardLayout = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      <aside className="flex w-64 flex-col border-r border-border bg-background shrink-0">
        <div className="flex items-center gap-2 px-6 py-5 text-xl font-bold text-foreground">
          <span className="text-2xl">🔥</span>
          <span>Vyxlo</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 overflow-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Affiliate */}
        <div className="px-3 pb-2">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-primary hover:bg-secondary transition-colors">
            <Gift className="h-4 w-4" />
            Become an Affiliate
          </button>
        </div>

        {/* AI Usage */}
        <div className="border-t border-border px-4 py-4">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>AI Usage</span>
            <span>12/50</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary">
            <div className="h-full w-[24%] rounded-full bg-primary" />
          </div>
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between">
            <div className="truncate text-sm text-foreground">{user?.email}</div>
            <Button variant="ghost" size="icon" onClick={signOut} className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
