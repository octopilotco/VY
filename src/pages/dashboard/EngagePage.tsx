import { MessageCircle, Heart, Repeat2, AtSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const engagements = [
  { type: "reply", user: "Sarah Chen", handle: "@sarahc", text: "Great point! I've seen similar results with my audience.", time: "5m ago" },
  { type: "like", user: "Alex Johnson", handle: "@alexj", text: "liked your tweet about content strategy", time: "12m ago" },
  { type: "retweet", user: "Mike Rivera", handle: "@mikeriv", text: "retweeted your thread on growth hacking", time: "1h ago" },
  { type: "mention", user: "Priya Patel", handle: "@priyap", text: "@vyxlo has the best analytics tool I've used. Highly recommend!", time: "2h ago" },
  { type: "reply", user: "David Kim", handle: "@davidk", text: "Would love to hear more about your approach to this.", time: "3h ago" },
  { type: "like", user: "Growth Hacker", handle: "@growthhacker", text: "liked your reply", time: "4h ago" },
];

const typeConfig = {
  reply: { icon: MessageCircle, color: "text-blue-400", label: "Reply" },
  like: { icon: Heart, color: "text-red-400", label: "Like" },
  retweet: { icon: Repeat2, color: "text-green-400", label: "Retweet" },
  mention: { icon: AtSign, color: "text-primary", label: "Mention" },
};

const EngagePage = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Engage
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Stay on top of your interactions</p>
      </div>

      <div className="space-y-3">
        {engagements.map((e, i) => {
          const config = typeConfig[e.type as keyof typeof typeConfig];
          return (
            <div key={i} className="glass-card rounded-xl p-4 flex items-start gap-3">
              <div className={`mt-0.5 ${config.color}`}>
                <config.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground text-sm">{e.user}</span>
                  <span className="text-muted-foreground text-sm">{e.handle}</span>
                  <span className="text-muted-foreground text-xs">· {e.time}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">{config.label}</Badge>
                </div>
                <p className="mt-1 text-sm text-foreground/80">{e.text}</p>
              </div>
              {e.type === "reply" || e.type === "mention" ? (
                <Button size="sm" variant="outline" className="rounded-full text-xs shrink-0">Reply</Button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EngagePage;
