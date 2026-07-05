import { Link } from "react-router-dom";
import { LogoSVG } from "@/assets/icons";

// Homepage-only side navigation: the brandbook's // device as a table of contents.
const railLinks = [
  { num: "01", label: "CONTROL", href: "#hero" },
  { num: "02", label: "DISTRIBUTION", href: "#platform" },
  { num: "03", label: "WHY PODCAST", href: "#why-podcast" },
  { num: "04", label: "WHY POD21", href: "#why" },
  { num: "05", label: "SERVICES", href: "#services" },
  { num: "06", label: "PROCESS", href: "#work" },
  { num: "07", label: "CLIENTS", href: "#testimonials" },
  { num: "08", label: "FAQ", href: "#faq" },
  { num: "09", label: "COMMISSION", href: "#contact" },
];

const IndexRail = () => {
  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      id="index-rail"
      aria-label="Page index"
      className="fixed left-0 top-0 bottom-0 z-50 hidden w-60 flex-col justify-between border-r border-stroke bg-bgPrimary px-7 py-8 xl:flex"
    >
      <Link to="/" id="index-rail--wordmark" aria-label="pod21 home">
        <LogoSVG width={90} height={37} color="#f3efeb" />
      </Link>

      <ol id="index-rail--index" className="flex flex-col gap-5">
        {railLinks.map((link) => (
          <li key={link.num}>
            <a
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="proxy-id--index-rail--index-link readout flex gap-3 text-[#5c5a57] transition-colors hover:text-boneWhite [&:hover>span]:text-primary-100"
            >
              <span className="transition-colors">{link.num} //</span>
              {link.label}
            </a>
          </li>
        ))}
      </ol>

      <p
        id="index-rail--location"
        className="readout leading-relaxed text-[#5c5a57]"
      >
        UK // MEXICO // USA
        <br />
        // EVERYWHERE SIGNAL TRAVELS
      </p>
    </nav>
  );
};

export default IndexRail;
