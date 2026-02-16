import { Sparkles, Zap, Brain, PenTool, Clock, BarChart3, BookOpen, Activity, CalendarClock, Check } from "lucide-react";

const features = [
  {
    category: "AI CHAT",
    icon: Sparkles,
    title: "Your Voice. Infinite Firepower.",
    description: "Chat with AI that knows your style, audience, and goals. Generate content ideas, refine your messaging, and brainstorm strategies — all in your voice.",
    bullets: ["Personalized AI that learns your tone", "Context-aware content generation", "Strategic brainstorming partner"],
  },
  {
    category: "INSPIRATION",
    icon: Brain,
    title: "Never run out of content ideas again",
    description: "Our advanced inspiration engine curates trending topics, viral formats, and personalized suggestions based on your niche and audience.",
    bullets: ["AI-curated trending topics daily", "Personalized to your niche", "One-click content creation"],
  },
  {
    category: "AI WRITER",
    icon: PenTool,
    title: "Write faster. Write better.",
    description: "Transform rough ideas into polished tweets. Our AI writer understands 𝕏 algorithms and crafts content optimized for maximum engagement.",
    bullets: ["Algorithm-optimized writing", "Multiple tone options", "Thread & single tweet support"],
  },
  {
    category: "REWRITE",
    icon: Zap,
    title: "Your new secret weapon",
    description: "Take any tweet and rewrite it in your voice. Perfect for putting your spin on trending topics or refreshing your best-performing content.",
    bullets: ["Voice-matched rewrites", "Preserve original intent", "Boost engagement scores"],
  },
  {
    category: "SCHEDULER",
    icon: Clock,
    title: "Post at the perfect time",
    description: "Our next-gen scheduler analyzes your audience's activity patterns and automatically queues posts for maximum visibility and engagement.",
    bullets: ["Smart time optimization", "Auto-queue management", "Cross-timezone scheduling"],
  },
  {
    category: "ANALYTICS",
    icon: BarChart3,
    title: "Grow with data, not guesswork",
    description: "Track every metric that matters. From follower growth to engagement rates, get actionable insights to refine your strategy.",
    bullets: ["Real-time performance tracking", "Engagement pattern analysis", "Growth trend forecasting"],
  },
  {
    category: "LIBRARY",
    icon: BookOpen,
    title: "Search Smarter. Steal Like a Strategist.",
    description: "Build your personal library of high-performing content. Search semantically, bookmark inspiration, and never lose a great tweet again.",
    bullets: ["Semantic search technology", "Smart bookmarking system", "Content categorization"],
  },
  {
    category: "ALGORITHM",
    icon: Activity,
    title: "Win the Algorithm Before You Hit Send",
    description: "Simulate how the 𝕏 algorithm will treat your content before you post. Optimize for reach, engagement, and virality.",
    bullets: ["Pre-publish score prediction", "Algorithm factor breakdown", "Optimization suggestions"],
  },
  {
    category: "ADVANCED SCHEDULER",
    icon: CalendarClock,
    title: "Scheduling That Works While You Sleep",
    description: "Set up auto-retweet, auto-plug, and auto-delete rules. Your content works around the clock while you focus on creating.",
    bullets: ["Auto-retweet top performers", "Smart auto-plug system", "Scheduled auto-deletion"],
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="border-b border-border section-padding">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          Vyxlo Just <span className="text-gradient">Leveled Up</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-muted-foreground">
          Every feature you need to dominate 𝕏, all in one powerful platform.
        </p>

        <div className="mt-20 space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.category}
              className={`flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Mockup */}
              <div className="flex-1">
                <div className="glass-card flex aspect-video items-center justify-center rounded-2xl shadow-lg shadow-black/10">
                  <feature.icon className="h-16 w-16 text-muted-foreground/20" />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  {feature.category}
                </span>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground">{feature.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{feature.description}</p>
                <ul className="mt-6 space-y-3">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
