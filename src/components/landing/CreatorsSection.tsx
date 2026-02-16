import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Indie Hackers",
    description: "Build in public, share your journey, and grow your audience alongside your product.",
  },
  {
    title: "Web Creators",
    description: "Content creators who want to maximize their reach and engagement on 𝕏.",
  },
  {
    title: "Traders & Analysts",
    description: "Share market insights, build authority, and connect with your financial community.",
  },
  {
    title: "Founders",
    description: "Establish thought leadership, attract talent, and build your startup's presence.",
  },
  {
    title: "Influencers",
    description: "Scale your content production and maintain consistent engagement with your audience.",
  },
];

const CreatorsSection = () => {
  return (
    <section id="creators" className="border-b border-border section-padding">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            For Serious Creators
          </h2>
          <Button className="rounded-full bg-foreground px-8 py-6 text-base font-semibold text-background transition-all duration-200 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/5">
            Try Vyxlo Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.title} className="glass-card group rounded-2xl p-6 transition-all duration-250">
              <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;
