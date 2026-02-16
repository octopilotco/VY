import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Bold, Italic, List, Link, Image, Smile, Send, RotateCcw } from "lucide-react";

const tones = ["Professional", "Casual", "Witty", "Inspirational", "Educational"];

const ContentStudioPage = () => {
  const [content, setContent] = useState("");
  const [activeTone, setActiveTone] = useState("Professional");
  const [showRewrite, setShowRewrite] = useState(false);

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Content Studio</h1>
        <p className="text-sm text-muted-foreground mt-1">Write, rewrite, and perfect your posts with AI</p>
      </div>

      {/* Tone selector */}
      <div className="mb-4">
        <span className="text-xs text-muted-foreground mb-2 block">Tone / Style</span>
        <div className="flex gap-2 flex-wrap">
          {tones.map((tone) => (
            <button
              key={tone}
              onClick={() => setActiveTone(tone)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                activeTone === tone
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="glass-card rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 border-b border-border px-4 py-2">
          <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Bold className="h-4 w-4" /></button>
          <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Italic className="h-4 w-4" /></button>
          <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><List className="h-4 w-4" /></button>
          <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Link className="h-4 w-4" /></button>
          <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Image className="h-4 w-4" /></button>
          <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Smile className="h-4 w-4" /></button>
          <div className="flex-1" />
          <Badge variant="secondary" className="text-xs">{content.length}/280</Badge>
        </div>

        {/* Text area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Start typing or let AI help you..."
          className="w-full min-h-[200px] bg-transparent p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
        />

        {/* Actions bar */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full text-xs"
              onClick={() => setShowRewrite(!showRewrite)}
            >
              <Wand2 className="mr-1 h-3 w-3" />
              Rewrite with AI
            </Button>
            <Button size="sm" variant="outline" className="rounded-full text-xs">
              <Sparkles className="mr-1 h-3 w-3" />
              Generate with AI
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="text-xs">
              <RotateCcw className="mr-1 h-3 w-3" /> Clear
            </Button>
            <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-4">
              <Send className="mr-1 h-3 w-3" /> Post Now
            </Button>
          </div>
        </div>
      </div>

      {/* Rewrite panel */}
      {showRewrite && (
        <div className="mt-4 glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-primary" />
            AI Rewrite Suggestions
          </h3>
          <div className="space-y-3">
            {["More engaging", "Shorter & punchier", "Add a hook"].map((style) => (
              <div key={style} className="rounded-lg bg-secondary p-3">
                <span className="text-xs text-primary font-medium">{style}</span>
                <p className="text-sm text-foreground/80 mt-1">
                  {content || "Type something first to get AI suggestions..."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentStudioPage;
