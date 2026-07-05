import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LogoSVG } from "@/assets/icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

interface NavbarProps {
  // On the homepage the IndexRail owns the left edge on xl screens
  withRail?: boolean;
}

const sessionDate = new Date()
  .toISOString()
  .slice(0, 10)
  .replaceAll("-", ".");

const Navbar = ({ withRail = false }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Process" },
    { href: "#testimonials", label: "Clients" },
    { href: "/about", label: "About", isPage: true },
    { href: "/blog", label: "Blog", isPage: true },
  ];

  const drawerLinks = [
    { href: "#why-podcast", label: "Why start a podcast?" },
    { href: "#why", label: "Why pod21?" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Process" },
    { href: "#testimonials", label: "Clients" },
    { href: "#faq", label: "FAQ" },
    { href: "/about", label: "About", isPage: true },
    { href: "/blog", label: "Blog", isPage: true },
  ];

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const scrollToTarget = () => {
        const element = document.querySelector(href);
        if (element) {
          const y =
            element.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(scrollToTarget, 100);
      } else {
        scrollToTarget();
      }
    }
  };

  return (
    <nav
      id="navbar"
      className={cn(
        "fixed top-0 right-0 left-0 z-40 border-b border-stroke bg-bgPrimary",
        withRail && "xl:left-60"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1360px] items-center justify-between gap-x-6 px-6 py-[19px]",
          "md:px-8"
        )}
      >
        <Link
          id="navbar--wordmark"
          to="/"
          className={cn("cursor-pointer", withRail && "xl:hidden")}
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick("#hero");
          }}
          aria-label="pod21 home"
        >
          <LogoSVG width={72} height={30} color="#f3efeb" />
        </Link>

        {/* Session readout: the console strip's live line */}
        <div
          id="navbar--readouts"
          className="readout hidden items-center gap-x-5 text-[#5c5a57] min-[1450px]:flex"
        >
          <span>SESSION {sessionDate}</span>
          <span className="slash-sep">{"//"}</span>
          <span>FULL-SERVICE PRODUCTION</span>
          <span className="slash-sep">{"//"}</span>
          <span className="flex items-center gap-2 text-primary-100">
            <span className="rec-dot inline-block h-2 w-2 rounded-full bg-red-100"></span>
            REC
          </span>
        </div>

        {/* Desktop navigation */}
        <div
          id="navbar--links"
          className={cn("items-center gap-6", !isMobile ? "flex" : "hidden")}
        >
          {navLinks.map((link, index) => (
            <span key={index} className="flex items-center gap-6">
              {index > 0 && <span className="readout slash-sep">{"//"}</span>}
              {link.isPage ? (
                <Link to={link.href} className="nav-link">
                  {link.label}
                </Link>
              ) : (
                <Link
                  to={link.href}
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(link.href);
                  }}
                >
                  {link.label}
                </Link>
              )}
            </span>
          ))}
        </div>

        <Link
          id="navbar--contact-cta"
          to="/contact"
          className={cn(!isMobile ? "block" : "hidden")}
        >
          <Button size="sm" variant="default">
            Open a channel
          </Button>
        </Link>

        {/* Mobile menu */}
        <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DrawerTrigger asChild className={isMobile ? "block" : "hidden"}>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto bg-transparent p-0 hover:bg-transparent"
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7 cursor-pointer text-boneWhite" />
            </Button>
          </DrawerTrigger>
          <DrawerContent
            id="navbar--mobile-drawer"
            className="rounded-t-[6px] border-stroke bg-bgPrimary px-side-spacing-mobile py-6"
          >
            <div className="mb-6 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileMenuClose}
                className="h-auto bg-transparent p-0 hover:bg-transparent"
                aria-label="Close menu"
              >
                <X className="h-8 w-8 cursor-pointer text-boneWhite" />
              </Button>
            </div>
            <div className="flex flex-col items-center">
              {drawerLinks.map((link, index) =>
                link.isPage ? (
                  <Link
                    key={index}
                    to={link.href}
                    className="proxy-id--navbar--mobile-drawer--link w-full py-3 mb-3 text-center font-mono text-[13px] uppercase tracking-[0.14em] text-boneWhite"
                    onClick={handleMobileMenuClose}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={index}
                    to={link.href}
                    className="proxy-id--navbar--mobile-drawer--link w-full py-3 mb-3 text-center font-mono text-[13px] uppercase tracking-[0.14em] text-boneWhite"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileMenuClose();
                      handleNavLinkClick(link.href);
                    }}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                to="/contact"
                onClick={handleMobileMenuClose}
                className="mt-3 block"
              >
                <Button size="sm" variant="default">
                  Open a channel
                </Button>
              </Link>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
