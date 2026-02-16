import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Heart, MessageCircle, Repeat2, Eye, ArrowRight, Sparkles } from "lucide-react";

const tabs = ["All", "Media", "Articles", "Tweets", "Daily Mix"];
const categories = [
  { label: "All", count: 48 },
  { label: "Products", count: 12 },
  { label: "Trending", count: 8 },
  { label: "Media", count: 15 },
  { label: "Viral", count: 13 },
];

const mockTweets = [
  {
    id: 1,
    avatar: "🧑‍💻",
    name: "Alex Johnson",
    handle: "@alexj",
    time: "2h ago",
    text: "Just shipped a new feature that increased our conversion rate by 34%. The key? We listened to what our users were actually asking for instead of building what we thought they needed.",
    category: "Products",
    likes: 234,
    replies: 45,
    retweets: 89,
  },
  {
    id: 2,
    avatar: "👩‍🎨",
    name: "Sarah Chen",
    handle: "@sarahc",
    time: "4h ago",
    text: "Hot take: The best marketing strategy in 2025 isn't ads, it's building in public. Share your journey, your failures, and your wins. People connect with authenticity.",
    category: "Trending",
    likes: 567,
    replies: 123,
    retweets: 201,
  },
  {
    id: 3,
    avatar: "🚀",
    name: "Mike Rivera",
    handle: "@mikeriv",
    time: "6h ago",
    text: "I analyzed 500 viral tweets and found 3 patterns:\n\n1. They challenge conventional wisdom\n2. They share specific numbers\n3. They tell a story in under 280 chars\n\nBookmark this.",
    category: "Viral",
    likes: 1243,
    replies: 89,
    retweets: 456,
  },
  {
    id: 4,
    avatar: "💡",
    name: "Priya Patel",
    handle: "@priyap",
    time: "8h ago",
    text: "Reminder: Your audience doesn't care about your product features. They care about how your product makes their life better. Lead with outcomes, not specifications.",
    category: "Products",
    likes: 345,
    replies: 67,
    retweets: 123,
  },
  {
    id: 5,
    avatar: "📊",
    name: "David Kim",
    handle: "@davidk",
    time: "12h ago",
    text: "I grew from 1K to 50K followers in 8 months. Here's my exact content strategy thread 🧵",
    category: "Media",
    likes: 892,
    replies: 234,
    retweets: 567,
  },
];

const InspirationPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTweets = activeCategory === "All" 
    ? mockTweets 
    : mockTweets.filter(t => t.category === activeCategory);

  return (
    <div className="p-6 lg:p-8">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Today's suggestions header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Today's tweet suggestions
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Curated content ideas based on your context</p>
        </div>
        <Button variant="outline" size="sm" className="text-muted-foreground">
          <Settings className="h-4 w-4 mr-2" />
          Manage context
        </Button>
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeCategory === cat.label
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
            <span className="text-xs opacity-70">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Tweet cards */}
      <div className="space-y-4">
        {filteredTweets.map((tweet) => (
          <div key={tweet.id} className="glass-card rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-lg">
                {tweet.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground text-sm">{tweet.name}</span>
                  <span className="text-muted-foreground text-sm">{tweet.handle}</span>
                  <span className="text-muted-foreground text-xs">· {tweet.time}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">{tweet.category}</Badge>
                </div>
                <p className="mt-2 text-sm text-foreground/90 whitespace-pre-line leading-relaxed">{tweet.text}</p>
                
                {/* Engagement */}
                <div className="mt-3 flex items-center gap-5 text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-xs">
                    <Heart className="h-3.5 w-3.5" /> {tweet.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <MessageCircle className="h-3.5 w-3.5" /> {tweet.replies}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <Repeat2 className="h-3.5 w-3.5" /> {tweet.retweets}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-4">
                    Use Tweet <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full text-xs px-4">
                    <Eye className="mr-1 h-3 w-3" /> View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationPage;
