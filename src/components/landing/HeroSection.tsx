import { useState, useEffect } from "react";
import { ArrowRight, Star, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import HeroMockup from "./HeroMockup";

const rotatingWords = ["hidden insights", "smart analytics", "actionable data"];

const avatars = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=4",
  "https://i.pravatar.cc/40?img=5",
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">
        {/* Left side */}
        <div className="flex flex-col justify-center">
          <h1 className="text-[3.25rem] font-extrabold leading-[1.08] tracking-tight text-foreground lg:text-[3.75rem]">
            Grow faster on{" "}
            <span className="font-black">𝕏</span>
            <br />
            with{" "}
            <span className="relative inline-block min-w-[220px] lg:min-w-[280px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="inline-block italic text-gradient"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Understand your audience, refine your content, and accelerate your 𝕏 growth — all in one place.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button className="w-fit rounded-full bg-foreground px-8 py-6 text-base font-semibold text-background transition-all duration-200 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/5">
              Start Growing Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Chrome className="h-4 w-4 text-green-500" />
              <span>Featured on Chrome Webstore</span>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
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
            <span className="text-sm text-muted-foreground">Loved by 1,458+ creators</span>
          </div>

          {/* Product Hunt badge */}
          <div className="mt-6 flex w-fit items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors duration-200 hover:border-muted-foreground/20">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Product Hunt</p>
              <p className="text-sm font-bold text-foreground">#1 Product of the Day</p>
            </div>
          </div>
        </div>

        {/* Right side - App preview mockup */}
        <HeroMockup />
      </div>
    </section>
  );
};

export default HeroSection;
