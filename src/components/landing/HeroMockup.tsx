import vyxloLogo from "@/assets/vyxlo-logo.png";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: "✏️", label: "My Post Queue" },
  { icon: "💡", label: "Inspiration", active: true },
  { icon: "📚", label: "Library" },
  { icon: "📊", label: "Analytics" },
  { icon: "✨", label: "Content Studio" },
  { icon: "🌐", label: "Social Hub" },
  { icon: "💬", label: "Engage" },
  { icon: "🌍", label: "Context" },
];

const HeroMockup = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="glass-card overflow-hidden rounded-2xl shadow-2xl shadow-black/20">
        <div className="flex">
          {/* Mini sidebar */}
          <div className="w-48 border-r border-border bg-card p-4">
            <img src={vyxloLogo} alt="Vyxlo" className="mb-6 h-7 w-7 rounded" />
            <div className="space-y-0.5">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                    item.active
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>AI Usage</span>
                <span>24h</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                <div className="h-full w-1/4 rounded-full bg-red-500" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-foreground">Inspiration</h2>
            <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
              {["All", "Media", "Articles", "Tweets", "Daily Mix"].map((tab, i) => (
                <span key={tab} className={i === 0 ? "text-foreground font-medium" : "hover:text-foreground transition-colors duration-200 cursor-pointer"}>
                  {tab}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Today's tweet suggestions</h3>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  ✏️ Manage context
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Custom-generated tweets tailored to your profile
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              {[
                { label: "All", count: 10, active: true },
                { label: "Products", count: 1 },
                { label: "Trending", count: 2 },
                { label: "Media", count: 2 },
                { label: "Viral", count: 5 },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className={`rounded-full px-3 py-1 text-xs transition-colors duration-200 ${
                    chip.active
                      ? "bg-primary/20 text-primary font-medium"
                      : "border border-border text-muted-foreground hover:border-muted-foreground/30"
                  }`}
                >
                  {chip.label} {chip.count}
                </span>
              ))}
            </div>

            {/* Tweet cards */}
            <div className="mt-4 space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4 transition-colors duration-200 hover:border-muted-foreground/20">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div>
                      <span className="text-sm font-semibold text-foreground">Tibo ✓</span>
                      <span className="ml-2 text-xs text-muted-foreground">@tibo_maker · 3m ago</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {i === 1
                      ? "Vyxlo builds a ready-to-publish wall of content for you, every single day"
                      : "Vyxlo finds and generates relevant memes based on what you usually talk about."}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                      Product
                    </span>
                    <Button size="sm" variant="outline" className="h-7 rounded-full text-xs transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30">
                      Use Tweet
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
