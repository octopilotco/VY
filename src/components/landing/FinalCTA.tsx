import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-bold text-foreground lg:text-5xl">
          Take The Easy Route.{" "}
          <span className="text-gradient">Grow With Vyxlo!</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Join 1458+ creators who are already growing faster on 𝕏.
        </p>
        <Button className="mt-8 rounded-full bg-foreground px-10 py-6 text-base font-semibold text-background hover:bg-foreground/90">
          Get Started for Free
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
