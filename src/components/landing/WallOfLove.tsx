import { Star } from "lucide-react";

const row1 = [
  { name: "DevDan", text: "Vyxlo completely changed how I approach content. The AI suggestions are scarily accurate." },
  { name: "CryptoKate", text: "Best investment I've made for my 𝕏 growth. The analytics alone are worth 10x the price." },
  { name: "SaaSFounder", text: "Went from 2K to 15K followers in 3 months. The scheduling + inspiration combo is unbeatable." },
  { name: "DesignLily", text: "I love how it understands my creative voice. The rewrites feel like ME, not generic AI slop." },
  { name: "GrowthMax", text: "The algorithm simulator saved me from posting a dud thread. Now every post is optimized." },
  { name: "IndieRaj", text: "Building in public is 10x easier with Vyxlo. The content ideas never stop flowing." },
];

const row2 = [
  { name: "WriterJo", text: "My engagement rate tripled in the first week. The AI writer is like having a ghostwriter." },
  { name: "TechSam", text: "Finally a tool that doesn't just schedule — it helps me CREATE better content from scratch." },
  { name: "MarketerAli", text: "Vyxlo's inspiration engine is pure gold. I've found content angles I never would have thought of." },
  { name: "FounderLee", text: "The library feature is underrated. I've built a searchable vault of my best ideas." },
  { name: "CoachMia", text: "Vyxlo helped me establish thought leadership. My DMs are now full of coaching inquiries." },
  { name: "AnalystPro", text: "The data insights are next level. I can see exactly what resonates with my audience." },
];

const TestimonialCard = ({ name, text }: { name: string; text: string }) => (
  <div className="glass-card w-[300px] shrink-0 rounded-2xl p-5">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
      ))}
    </div>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
    <p className="mt-3 text-sm font-semibold text-foreground">{name}</p>
  </div>
);

const WallOfLove = () => {
  return (
    <section id="testimonials" className="border-b border-border section-padding">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          Trusted by <span className="text-gradient">Creators</span>
        </h2>
      </div>

      <div className="mt-14 space-y-6 overflow-hidden">
        <div className="animate-scroll-left flex gap-6">
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} {...t} />
          ))}
        </div>
        <div className="animate-scroll-left-slow flex gap-6" style={{ animationDirection: "reverse" }}>
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WallOfLove;
