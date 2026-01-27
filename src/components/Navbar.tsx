import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LogoSVG, PhoneSVG } from "@/assets/icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    {
      href: "#why-podcast",
      label: "Why start a podcast?",
    },
    {
      href: "#why",
      label: "Why pod21?",
    },
    {
      href: "#services",
      label: "Our Services",
    },
    {
      href: "#work",
      label: "How We Work",
    },
    {
      href: "#testimonials",
      label: "Client Spotlight",
    },
    {
      href: "#faq",
      label: "FAQs",
    },
    {
      href: "/about",
      label: "About",
      isPage: true,
    },
    {
      href: "/blog",
      label: "Blog",
      isPage: true,
    },
  ];

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = (href) => {
    if (href.startsWith("#")) {
      // If we're not on the home page and the link is a fragment, go to home page first
      if (location.pathname !== "/") {
        navigate("/");
        // Need to scroll after navigation completes
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            const yOffset = -100; // Offset for navbar
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100);
      } else {
        // We're already on the home page, just scroll
        const element = document.querySelector(href);
        if (element) {
          const yOffset = -100; // Offset for navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed border-[1px] border-stroke top-[20px] right-0 left-0 rounded-2xl z-50 transition-all duration-300 bg-bgPrimary max-w-[1360px] ",
        "mx-side-spacing-mobile md:mx-side-spacing-tablet lg:mx-side-spacing xl:mx-auto"
      )}
    >
      <div
        className={cn(
          "mx-auto px-6 py-[19px] flex justify-between items-center gap-x-6",
          "md:px-8"
        )}
      >
        <Link
          to="/"
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick("#hero");
          }}
        >
          <LogoSVG width={72} height={30} color="#bbf298" />
        </Link>

        {/* Desktop Navigation - shown when screen width >= 1250px */}
        <div
          className={cn("items-center gap-10", !isMobile ? "flex" : "hidden")}
        >
          {navLinks.map((link, index) =>
            link.isPage ? (
              <Link
                key={index}
                to={link.href}
                className="nav-link whitespace-nowrap"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={index}
                to={link.href}
                className="nav-link whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick(link.href);
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <Link to="/contact" className={cn(!isMobile ? "block" : "hidden")}>
          <Button size="sm" variant="default">
            <PhoneSVG width={18} height={18} className="mr-1" />
            Contact Us
          </Button>
        </Link>

        {/* Mobile Menu */}
        <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DrawerTrigger asChild className={isMobile ? "block" : "hidden"}>
            <Button
              variant="default"
              size="sm"
              className="p-0 h-auto bg-transparent hover:bg-transparent"
            >
              <Menu className="h-7 w-7 cursor-pointer text-boneWhite" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-bgPrimary px-side-spacing-mobile py-6 rounded-t-[10px] border-stroke">
            <div className="flex justify-end mb-6">
              <Button
                variant="default"
                size="sm"
                onClick={handleMobileMenuClose}
                className="p-0 h-auto bg-transparent hover:bg-transparent"
              >
                <X className="h-8 w-8 cursor-pointer text-boneWhite" />
              </Button>
            </div>
            <div className="flex flex-col items-center">
              {navLinks.map((link, index) =>
                link.isPage ? (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-boneWhite text-body-md text-center w-full py-3 mb-3"
                    onClick={handleMobileMenuClose}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-boneWhite text-body-md text-center w-full py-3 mb-3"
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
                  <PhoneSVG width={18} height={18} className="mr-2" />
                  Contact Us
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
