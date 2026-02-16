import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, RotateCcw, Plug, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const timeSlots = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const scheduledPosts = [
  { id: 1, day: "Mon", time: "10:00 AM", text: "Thread about growth strategies 🧵", status: "scheduled" },
  { id: 2, day: "Tue", time: "2:00 PM", text: "Quick tip on content creation", status: "scheduled" },
  { id: 3, day: "Thu", time: "12:00 PM", text: "Case study breakdown", status: "draft" },
  { id: 4, day: "Fri", time: "6:00 PM", text: "Weekend reading list 📚", status: "scheduled" },
];

const PostQueuePage = () => {
  const [autoRetweet, setAutoRetweet] = useState(true);
  const [autoPlug, setAutoPlug] = useState(false);
  const [autoDelete, setAutoDelete] = useState(false);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            My Post Queue
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Schedule and manage your posts</p>
        </div>
        <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-4">
          <Plus className="mr-1 h-3 w-3" /> New Post
        </Button>
      </div>

      {/* Auto settings */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        {[
          { label: "Auto-Retweet", icon: RotateCcw, active: autoRetweet, toggle: () => setAutoRetweet(!autoRetweet) },
          { label: "Auto-Plug", icon: Plug, active: autoPlug, toggle: () => setAutoPlug(!autoPlug) },
          { label: "Auto-Delete", icon: Trash2, active: autoDelete, toggle: () => setAutoDelete(!autoDelete) },
        ].map((opt) => (
          <button
            key={opt.label}
            onClick={opt.toggle}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs transition-colors ${
              opt.active
                ? "bg-primary/10 text-primary border border-primary/30"
                : "bg-secondary text-muted-foreground border border-border"
            }`}
          >
            <opt.icon className="h-3 w-3" />
            {opt.label}
            <span className={`ml-1 font-medium ${opt.active ? "text-primary" : ""}`}>
              {opt.active ? "ON" : "OFF"}
            </span>
          </button>
        ))}
      </div>

      {/* Calendar nav */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium text-foreground">This Week — Feb 17–23, 2026</span>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar grid */}
      <div className="glass-card rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-8 border-b border-border">
          <div className="p-3 text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Time
          </div>
          {days.map((d) => (
            <div key={d} className="p-3 text-xs font-medium text-foreground text-center border-l border-border">
              {d}
            </div>
          ))}
        </div>

        {/* Time slots */}
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-8 border-b border-border last:border-0">
            <div className="p-3 text-xs text-muted-foreground">{time}</div>
            {days.map((day) => {
              const post = scheduledPosts.find((p) => p.day === day && p.time === time);
              return (
                <div key={day} className="p-2 border-l border-border min-h-[60px]">
                  {post && (
                    <div className={`rounded-md p-2 text-xs ${
                      post.status === "scheduled" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                    }`}>
                      <p className="truncate">{post.text}</p>
                      <Badge variant="secondary" className="mt-1 text-[10px]">{post.status}</Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostQueuePage;
