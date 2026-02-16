import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const proFeatures = [
  "AI Chat Mode",
  "Inspiration Engine",
  "AI Writer",
  "Rewrite with AI",
  "Post Scheduler",
  "Basic Analytics",
  "Chrome Extension",
  "Email Support",
];

const advancedFeatures = [
  "Everything in PRO",
  "Advanced Inspiration Engine",
  "Algorithm Simulator",
  "Vyxlo Library",
  "Advanced Analytics",
  "Auto-Retweet",
  "Auto-Plug",
  "Auto-Delete",
  "Priority Support",
  "+ 15 more features",
];

const PricingSection = () => {
  return (
    <section id="pricing" className="border-b border-border section-padding">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-muted-foreground">
          Choose the plan that fits your growth goals.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* PRO */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-foreground">PRO</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold tracking-tight text-foreground">$39</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button className="mt-6 w-full rounded-full bg-foreground px-8 py-6 text-base font-semibold text-background transition-all duration-200 hover:bg-foreground/90 hover:shadow-lg">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <ul className="mt-8 space-y-3">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* ADVANCED */}
          <div className="relative glass-card rounded-2xl border-primary/40 p-8 glow-orange">
            <span className="absolute -top-3 right-6 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
              Best Value
            </span>
            <h3 className="text-lg font-semibold text-foreground">ADVANCED</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-foreground">$29</span>
              <span className="text-muted-foreground">/month</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">$49</span>
            </div>
            <p className="mt-1 text-xs font-medium text-primary">Early adopter discount</p>
            <Button className="mt-6 w-full rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <ul className="mt-8 space-y-3">
              {advancedFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
