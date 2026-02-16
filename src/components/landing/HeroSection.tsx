import { useState, useEffect } from "react";
import { ArrowRight, Star, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const rotatingWords = ["hidden insights", "smart analytics", "actionable data"];

const avatars = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=4",
  "https://i.pravatar.cc/40?img=5",
];

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

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        {/* Left side */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl">
            Grow faster on{" "}
            <span className="font-black">𝕏</span>
            <br />
            with{" "}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block italic text-gradient"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Understand your audience, refine your content, and accelerate your 𝕏 growth, all in one place.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <Button className="w-fit rounded-full bg-foreground px-8 py-6 text-base font-semibold text-background hover:bg-foreground/90">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Chrome className="h-4 w-4 text-green-500" />
              Featured on Chrome Webstore
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="User avatar"
                  className="h-8 w-8 rounded-full border-2 border-background"
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Loved by 1458+ creators</span>
          </div>

          {/* Product Hunt badge */}
          <div className="mt-6 flex w-fit items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product Hunt</p>
              <p className="text-sm font-bold text-foreground">#1 Product of the Day</p>
            </div>
          </div>
        </div>

        {/* Right side - App preview mockup */}
        <div className="relative hidden lg:block">
          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="flex">
              {/* Mini sidebar */}
              <div className="w-48 border-r border-border bg-card p-4">
                <div className="mb-6 text-xl">🔥</div>
                <div className="space-y-1">
                  {sidebarItems.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                        item.active
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground"
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
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div className="h-full w-1/4 rounded-full bg-red-500" />
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-foreground">Inspiration</h2>
                <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                  {["All", "Media", "Articles", "Tweets", "Daily Mix"].map((tab, i) => (
                    <span key={tab} className={i === 0 ? "text-foreground font-medium" : ""}>
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
                      className={`rounded-full px-3 py-1 text-xs ${
                        chip.active
                          ? "bg-primary/20 text-primary"
                          : "border border-border text-muted-foreground"
                      }`}
                    >
                      {chip.label} {chip.count}
                    </span>
                  ))}
                </div>

                {/* Tweet cards */}
                <div className="mt-4 space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div>
                          <span className="text-sm font-semibold text-foreground">Tibo ✓</span>
                          <span className="ml-2 text-xs text-muted-foreground">@tibo_maker · 3m ago</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {i === 1
                          ? "Vyxlo builds a ready-to-publish wall of content for you, every single day"
                          : "Vyxlo finds and generates relevant memes based on what you usually talk about."}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                          Product
                        </span>
                        <Button size="sm" variant="outline" className="h-7 rounded-full text-xs">
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
      </div>
    </section>
  );
};

export default HeroSection;
