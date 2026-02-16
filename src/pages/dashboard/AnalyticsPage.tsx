import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Eye, Heart, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";

const metrics = [
  { label: "Followers", value: "12,458", change: "+234", up: true, icon: Users },
  { label: "Impressions", value: "1.2M", change: "+18%", up: true, icon: Eye },
  { label: "Engagement Rate", value: "4.8%", change: "+0.3%", up: true, icon: Heart },
  { label: "Profile Visits", value: "8,921", change: "-2%", up: false, icon: TrendingUp },
];

const topTweets = [
  { text: "Just shipped a new feature...", impressions: "45.2K", engagement: "8.2%", likes: 567 },
  { text: "Hot take: The best marketing strategy...", impressions: "32.1K", engagement: "6.7%", likes: 423 },
  { text: "I analyzed 500 viral tweets...", impressions: "28.9K", engagement: "5.9%", likes: 389 },
  { text: "Reminder: Your audience doesn't care...", impressions: "21.3K", engagement: "4.5%", likes: 234 },
  { text: "I grew from 1K to 50K followers...", impressions: "18.7K", engagement: "3.8%", likes: 198 },
];

const weeklyData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 91 },
  { day: "Fri", value: 84 },
  { day: "Sat", value: 45 },
  { day: "Sun", value: 72 },
];

const AnalyticsPage = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Track your performance and growth on 𝕏</p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <Card key={m.label} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <m.icon className="h-5 w-5 text-muted-foreground" />
                <span className={`flex items-center gap-0.5 text-xs font-medium ${m.up ? "text-green-400" : "text-red-400"}`}>
                  {m.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {m.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-foreground">{m.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart placeholder */}
      <Card className="bg-card border-border mb-8">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Follower Growth (Last 7 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-40">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                  style={{ height: `${d.value}%` }}
                />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top tweets */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Top Performing Tweets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topTweets.map((tweet, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg bg-secondary p-3">
                <span className="text-lg font-bold text-muted-foreground w-6 text-center">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{tweet.text}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                  <span>{tweet.impressions} views</span>
                  <span>{tweet.engagement} eng.</span>
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{tweet.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
