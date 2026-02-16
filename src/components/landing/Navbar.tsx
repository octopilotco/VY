import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import vyxloLogo from "@/assets/vyxlo-logo.png";

const navLinks = ["Features", "Testimonials", "Creators", "Blog", "Chrome Extension"];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground">
          <img src={vyxloLogo} alt="Vyxlo" className="h-7 w-7 rounded" />
          <span>Vyxlo</span>
        </a>

        {/* Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Button className="hidden rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all duration-200 hover:bg-foreground/90 hover:shadow-lg md:flex">
          Get Started Free
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
