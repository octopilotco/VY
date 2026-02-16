import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Bookmark, Clock, Heart, MessageCircle, Repeat2, ExternalLink } from "lucide-react";

const filters = ["All", "Saved", "Bookmarked", "Recent"];
const topics = ["All Topics", "Growth", "Marketing", "Product", "AI", "Startups"];

const savedTweets = [
  {
    id: 1,
    avatar: "🎯",
    name: "Growth Hacker",
    handle: "@growthhacker",
    text: "The 80/20 rule of Twitter growth: 80% of your growth comes from 20% of your content. Find what works and double down.",
    topic: "Growth",
    savedAt: "2 days ago",
    likes: 456,
    replies: 34,
    retweets: 123,
  },
  {
    id: 2,
    avatar: "🤖",
    name: "AI Builder",
    handle: "@aibuilder",
    text: "Stop building features nobody asked for. Start building solutions to problems people are screaming about.",
    topic: "Product",
    savedAt: "3 days ago",
    likes: 789,
    replies: 56,
    retweets: 234,
  },
  {
    id: 3,
    avatar: "📈",
    name: "Marketing Pro",
    handle: "@marketingpro",
    text: "Content marketing isn't about creating content. It's about creating conversations. Big difference.",
    topic: "Marketing",
    savedAt: "5 days ago",
    likes: 321,
    replies: 23,
    retweets: 89,
  },
  {
    id: 4,
    avatar: "💰",
    name: "Startup Fund",
    handle: "@startupfund",
    text: "The best time to raise money is when you don't need it. Build something people love first, funding follows.",
    topic: "Startups",
    savedAt: "1 week ago",
    likes: 567,
    replies: 45,
    retweets: 178,
  },
];

const LibraryPage = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTopic, setActiveTopic] = useState("All Topics");

  const filtered = savedTweets.filter((t) => {
    const matchSearch = !search || t.text.toLowerCase().includes(search.toLowerCase());
    const matchTopic = activeTopic === "All Topics" || t.topic === activeTopic;
    return matchSearch && matchTopic;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Library
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Search Smarter. Steal Like a Strategist.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Semantic search across your saved content..."
          className="pl-10 bg-secondary border-border"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              activeFilter === f
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "Saved" && <Bookmark className="inline h-3 w-3 mr-1" />}
            {f === "Recent" && <Clock className="inline h-3 w-3 mr-1" />}
            {f}
          </button>
        ))}
      </div>

      {/* Topics */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTopic(t)}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              activeTopic === t
                ? "bg-foreground text-background font-medium"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((tweet) => (
          <div key={tweet.id} className="glass-card rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-lg">
                {tweet.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground text-sm">{tweet.name}</span>
                  <span className="text-muted-foreground text-sm">{tweet.handle}</span>
                  <span className="text-muted-foreground text-xs">· Saved {tweet.savedAt}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">{tweet.topic}</Badge>
                </div>
                <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{tweet.text}</p>
                <div className="mt-3 flex items-center gap-5 text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-xs"><Heart className="h-3.5 w-3.5" /> {tweet.likes}</span>
                  <span className="flex items-center gap-1.5 text-xs"><MessageCircle className="h-3.5 w-3.5" /> {tweet.replies}</span>
                  <span className="flex items-center gap-1.5 text-xs"><Repeat2 className="h-3.5 w-3.5" /> {tweet.retweets}</span>
                  <Button size="sm" variant="ghost" className="ml-auto text-xs text-muted-foreground">
                    <ExternalLink className="h-3 w-3 mr-1" /> Open
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

export default LibraryPage;
