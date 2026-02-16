import { ArrowRight, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChromeExtensionSection = () => {
  return (
    <section id="chrome-extension" className="border-b border-border section-padding">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          Insights anywhere on 𝕏.{" "}
          <span className="text-gradient">Instantly!</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Get powerful analytics and AI-driven insights directly in your 𝕏 feed with our Chrome extension. No tab switching needed.
        </p>
        <Button className="mt-8 rounded-full bg-foreground px-8 py-6 text-base font-semibold text-background transition-all duration-200 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/5">
          <Chrome className="mr-2 h-5 w-5" />
          Get Chrome Extension
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        {/* Mockup placeholder */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="glass-card flex aspect-video items-center justify-center rounded-2xl shadow-2xl shadow-black/10">
            <div className="text-center">
              <span className="text-6xl">🧩</span>
              <p className="mt-4 text-muted-foreground">Chrome Extension Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChromeExtensionSection;
