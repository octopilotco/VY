import { Users, Hash, TrendingUp, UserPlus, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SocialHubPage = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Social Hub
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your network and discover opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Following", value: "1,247", icon: UserPlus },
          { label: "Followers", value: "12,458", icon: Users },
          { label: "Lists", value: "8", icon: Hash },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-8 text-center">
          <TrendingUp className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-foreground font-medium mb-1">Discover Creators</h3>
          <p className="text-sm text-muted-foreground mb-4">Find and connect with creators in your niche</p>
          <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            Explore
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialHubPage;
