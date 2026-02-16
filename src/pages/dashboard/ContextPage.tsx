import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Plus, X } from "lucide-react";

const ContextPage = () => {
  const [contexts, setContexts] = useState([
    { id: 1, label: "My Brand Voice", value: "Professional, witty, data-driven. I write about growth, startups, and AI." },
    { id: 2, label: "Target Audience", value: "Indie hackers, startup founders, and tech creators building in public." },
    { id: 3, label: "Topics", value: "Growth hacking, content marketing, AI tools, product development" },
  ]);

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Context
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your writing context and voice preferences</p>
      </div>

      <div className="space-y-4">
        {contexts.map((ctx) => (
          <div key={ctx.id} className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium text-foreground">{ctx.label}</Label>
              <button className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <textarea
              defaultValue={ctx.value}
              className="w-full min-h-[80px] bg-secondary rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none border border-border"
            />
          </div>
        ))}
      </div>

      <Button variant="outline" className="mt-4 rounded-full text-sm">
        <Plus className="mr-1 h-4 w-4" /> Add Context
      </Button>

      <div className="mt-8 glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Display Name</Label>
            <Input defaultValue="Vyxlo User" className="mt-1 bg-secondary border-border" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">𝕏 Handle</Label>
            <Input defaultValue="@vyxlouser" className="mt-1 bg-secondary border-border" />
          </div>
          <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContextPage;
