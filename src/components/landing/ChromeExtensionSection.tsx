import { ArrowRight, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChromeExtensionSection = () => {
  return (
    <section id="chrome-extension" className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-bold text-foreground lg:text-5xl">
          Insights anywhere on 𝕏.{" "}
          <span className="text-gradient">Instantly!</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Get powerful analytics and AI-driven insights directly in your 𝕏 feed with our Chrome extension. No tab switching needed.
        </p>
        <Button className="mt-8 rounded-full bg-foreground px-8 py-6 text-base font-semibold text-background hover:bg-foreground/90">
          <Chrome className="mr-2 h-5 w-5" />
          Get Chrome Extension
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        {/* Mockup placeholder */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="glass-card aspect-video rounded-2xl flex items-center justify-center">
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
