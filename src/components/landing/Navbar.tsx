import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = ["Features", "Testimonials", "Creators", "Blog", "Chrome Extension"];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          <span className="text-2xl">🔥</span>
          <span>Vyxlo</span>
        </a>

        {/* Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Button className="hidden rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90 md:flex">
          Get Started for Free
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
