import vyxloLogo from "@/assets/vyxlo-logo.png";

const productLinks = ["Features", "Pricing", "Chrome Extension"];
const resourceLinks = ["Blog", "Testimonials", "Creators", "Affiliate Program", "Tools"];
const legalLinks = ["Terms", "Privacy"];

const Footer = () => {
  return (
    <footer className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground">
              <img src={vyxloLogo} alt="Vyxlo" className="h-7 w-7 rounded" />
              <span>Vyxlo</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Made with 💛 for creators who take 𝕏 seriously.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">Product</h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">Resources</h4>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">Legal</h4>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vyxlo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
